import * as express from "express";
import * as cors from "cors";
import * as functions from "firebase-functions";
import openai from "../utils/openai";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

// Parse request body as JSON
app.use(express.json());

app.post("/", async (req, res) => {
  const {problemContext, problemStatement, temperature, maxTokens} = req.body;

  if (!problemStatement || !problemContext) {
    res.status(400).send("Bad Request: Missing problem statement or problem context");
    return;
  }

  try {
    const prompt = `We are in a brainstorming session. 
    The problem at hand is: "${problemStatement}". 
    The context of this problem is: "${problemContext}". 
    As part of this collaborative ideation technique, 
    we encourage a free flow of creative and diverse ideas, building upon each other's thoughts, 
    exploring unconventional and innovative solutions. 
    Please share your thoughts, providing each idea as a bullet point.`;

    // Check if the prompt exceeds the token limit.
    if (prompt.length > 8190) { // GPT-4's max token limit is 8192
      throw new Error("Prompt is too long.");
    }

    const gptResponse = await openai.createCompletion({
      model: "gpt-4",
      prompt,
      max_tokens: maxTokens || 100,
      temperature: temperature || 0.7,
    });

    const ideas = gptResponse.data.choices.map((choice) => choice.text?.trim() || "");

    res.json({ideas});
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error: ", error);
    }
    res.status(500).send(`Internal Server Error: ${error instanceof Error ?
      error.message : "An unexpected error occurred."}`);
  }
});

// Expose Express API as a single cloud function:
export const handler = functions.https.onRequest(app);
