import * as functions from "firebase-functions";
import * as brainstorming from "./ideation/brainstorming";

// Specify the region if necessary, else default is us-central1
const region = "us-central1";

// Export the cloud functions
exports.brainstorming = functions.region(region).https.onRequest(brainstorming.handler);
