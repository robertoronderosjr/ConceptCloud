/* eslint-disable require-jsdoc */
import * as express from "express";
import * as cors from "cors";
import * as functions from "firebase-functions";
import openai from "../utils/openai";
import {IdeationTechniques} from "./ideationTechniques";
import {AxiosError} from "axios";

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

app.post("/", async (req, res) => {
  const {
    problemContext,
    problemStatement,
    technique,
    temperature,
    model,
    numIdeas = 5,
    tokensPerIdea = 20,
    maximumTokens,
  } = req.body;

  if (!problemStatement || !problemContext || !technique) {
    res.status(400).send("Bad Request: Missing problem statement, problem context, or technique");
    return;
  }

  type IdeationTechnique = {
    [key: string]: {
      systemMessage: string;
      userMessage: (numIdeas: number) => string;
      responseHandler: (gptResponse: any) => string[];
    };
  };

  const messages = (IdeationTechniques as unknown as IdeationTechnique)[technique];

  if (!messages) {
    res.status(400).send(`Bad Request: Invalid technique. 
      Valid techniques are: ${Object.keys(IdeationTechniques).join(", ")}`);
    return;
  }

  try {
    const systemMessage = messages.systemMessage;
    const userMessage = `The problem at hand is: "${problemStatement}". 
      The context of this problem is: "${problemContext}".` + messages.userMessage(numIdeas);

    let maxTokens = maximumTokens;

    // If the technique does not require numIdeas, ignore it
    if (["brainstorming", "synectics"].includes(technique)) {
      maxTokens = numIdeas * tokensPerIdea;
    }

    const gptResponse = await openai.createChatCompletion({
      model: model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: maxTokens + 150,
      temperature: temperature || 0.7,
    });

    const ideas = messages.responseHandler(gptResponse);

    const tokensUsed = gptResponse.data.choices?.[0]?.finish_reason === "stop" ?
      maxTokens :
      (gptResponse.data.usage?.total_tokens || maxTokens);

    res.json({ideas, tokensUsed});
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (isAxiosError(error)) {
      console.log("Error status: ", error.response?.status);
      console.log("Error data: ", error.response?.data);
      errorMessage = `OpenAI API error: ${error.response?.status}, 
        ${JSON.stringify(error.response?.data)}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).send(`Internal Server Error: ${errorMessage}`);
  }
});

app.post("/enhance", async (req, res) => {
  const {text} = req.body;

  if (!text) {
    res.status(400).send("Bad Request: Missing text");
    return;
  }

  try {
    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. 
            Your task is to enhance the following text and make it more detailed and descriptive.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const enhancedText = gptResponse.data.choices?.[0]?.message?.content || "";

    res.json({enhancedText});
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    if (isAxiosError(error)) {
      console.log("Error status: ", error.response?.status);
      console.log("Error data: ", error.response?.data);
      errorMessage = `OpenAI API error: ${error.response?.status}, 
        ${JSON.stringify(error.response?.data)}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).send(`Internal Server Error: ${errorMessage}`);
  }
});

export const ideation = functions.https.onRequest(app);
