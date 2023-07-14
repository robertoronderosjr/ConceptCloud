import * as functions from "firebase-functions";
import {handler} from "./ideation/server";

// Specify the region if necessary, else default is us-central1
const region = "us-central1";

// Export the cloud function
exports.ideation = functions.region(region).https.onRequest(handler);
