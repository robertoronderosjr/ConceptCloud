
/* eslint-disable max-len */
export const IdeationTechniques = {
  "brainstorming": {
    systemMessage: "We are in a brainstorming session. This is a collaborative ideation technique that fosters the generation of a large quantity of ideas in a creative and non-judgmental setting. We encourage everyone to freely express thoughts and build upon each other's ideas.",
    userMessage: (numIdeas: number) => `We encourage everyone to freely express thoughts and build upon each other's ideas.
      Please generate ${numIdeas} ideas.`,
    responseHandler: (gptResponse: any) => {
      let ideas = gptResponse.data.choices?.[0]?.message?.content?.trim()?.split("\n") ?? [];
      ideas = ideas.filter((idea: string) => idea.trim() !== "");
      return ideas;
    },
  },
  "synectics": {
    systemMessage: "We are in a synectics session. This is a creative problem-solving technique that encourages making connections between unrelated concepts to generate innovative ideas. We urge everyone to draw inspiration from diverse sources, such as metaphors and analogies.",
    userMessage: (numIdeas: number) => `We aim to make connections between seemingly unrelated concepts to generate innovative ideas.
      Please generate ${numIdeas} ideas.`,
    responseHandler: (gptResponse: any) => {
      let ideas = gptResponse.data.choices?.[0]?.message?.content?.trim()?.split("\n") ?? [];
      ideas = ideas.filter((idea: string) => idea.trim() !== "");
      return ideas;
    },
  },
  "morphologicalAnalysis": {
    systemMessage: "We are in a morphological analysis session. This problem-solving technique involves breaking down complex problems into their constituent parts and systematically exploring various combinations of these parts to generate potential solutions.",
    userMessage: () => "Let's break this problem down into its constituent parts and systematically explore various combinations of these parts.",
    responseHandler: (gptResponse: any) => {
      return gptResponse.data.choices?.[0]?.message?.content?.trim();
    },
  },
  "scamper": {
    systemMessage: "We are in a SCAMPER session. This creative problem-solving technique prompts individuals to modify and improve ideas or products through substituting, combining, adapting, modifying, putting to another use, eliminating, and reversing or rearranging. We challenge everyone to apply these approaches.",
    userMessage: () => "Let's try to modify and improve our existing ideas or products through substitution, combination, adaptation, modification, elimination, and rearrangement.",
    responseHandler: (gptResponse: any) => {
      return gptResponse.data.choices?.[0]?.message?.content?.trim();
    },
  },
  "provocation": {
    systemMessage: "We are in a Provocation-Based Ideation session. This technique involves introducing provocative statements or constraints to stimulate unconventional thinking. It encourages everyone to challenge assumptions and explore radical solutions.",
    userMessage: () => "We'll introduce provocative statements or constraints to stimulate unconventional thinking.",
    responseHandler: (gptResponse: any) => {
      return gptResponse.data.choices?.[0]?.message?.content?.trim();
    },
  },
  "sit": {
    systemMessage: "We are in a Systematic Inventive Thinking (SIT) session. This structured problem-solving method involves manipulating existing elements within a system to generate innovative solutions.",
    userMessage: () => "Let's manipulate the existing elements within our system to generate innovative solutions.",
    responseHandler: (gptResponse: any) => {
      return gptResponse.data.choices?.[0]?.message?.content?.trim();
    },
  },
  "sixThinkingHats": {
    systemMessage: "We are in a Six Thinking Hats session. This technique by Edward de Bono helps us approach problem-solving from different perspectives: White Hat for facts, Red Hat for emotions, Black Hat for risks, Yellow Hat for benefits, Green Hat for creativity, and Blue Hat for process.",
    userMessage: () => "We will approach this problem-solving from different perspectives. Please share your thoughts.",
    responseHandler: (gptResponse: any) => {
      return gptResponse.data.choices?.[0]?.message?.content?.trim();
    },
  },
};


