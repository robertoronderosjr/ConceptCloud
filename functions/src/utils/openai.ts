import {Configuration, OpenAIApi} from "openai";
import * as functions from "firebase-functions";

// Initializing OpenAI API with environment configuration
const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});

const openai = new OpenAIApi(configuration);

export default openai;
