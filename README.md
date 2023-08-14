# ConceptCloud

## Overview

ConceptCloud is a Node.js project that leverages Firebase, Express.js, and OpenAI's GPT-3 model to facilitate various ideation techniques. The project aims to provide an innovative platform for brainstorming and idea generation, utilizing the power of artificial intelligence.

The ideation techniques supported include:

- Brainstorming
- Synectics
- Morphological Analysis
- SCAMPER
- Provocation-Based Ideation
- Systematic Inventive Thinking (SIT)
- Six Thinking Hats

Each technique has its own system message, user message, and response handler.

## Getting Started

### Prerequisites

- Node.js
- Firebase CLI
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/robertoronderosjr/ConceptCloud.git
```

2. Navigate to the project directory
```bash
cd ConceptCloud
```

3. Install the dependencies
```bash
npm install
```

4. Initialize Firebase
```bash
firebase init
```

5. Set up your OpenAI API key in Firebase Functions configuration
```bash
firebase functions:config:set openai.key="YOUR_OPENAI_KEY"
```

## Usage

To start the server, run the following command in the project directory:

```bash
npm start
```

## Project Structure

- `.firebaserc` and `firebase.json`: Configuration files for Firebase.
- `.vscode/launch.json`: Contains configurations for launching the project in VS Code.
- `functions`: Contains the Firebase Functions for the project.
  - `src`: Contains the source code for the Firebase Functions.
    - `ideation`: Contains files related to the ideation process.
      - `ideationTechniques.ts`: Defines various ideation techniques and their respective system messages, user messages, and response handlers.
      - `server.ts`: Handles HTTP requests and responses, and interacts with the OpenAI API.
    - `index.ts`: The entry point for the Firebase Functions.
    - `utils`: Contains utility files.
      - `openai.ts`: Initializes the OpenAI API with the API key from the Firebase Functions configuration.

## Contributing

We welcome contributions from everyone. Before you start, please read our [Code of Conduct](CODE_OF_CONDUCT.md). Check the issue tracker for open issues that you can help with.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.