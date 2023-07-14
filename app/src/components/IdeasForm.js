import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startIdeation, receiveIdeas, ideationError } from '../actions/ideationActions';
import axios from 'axios';

const IdeasForm = () => {
  const dispatch = useDispatch();
  const [technique, setTechnique] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const problemContext = event.target.elements.problemContext.value;
    const problemStatement = event.target.elements.problemStatement.value;
    const technique = event.target.elements.technique.value;
    const temperature = event.target.elements.temperature.value;
    const model = event.target.elements.model.value;
    const numIdeas = event.target.elements.numIdeas?.value;
    const tokensPerIdea = event.target.elements.tokensPerIdea?.value;
    const maximumTokens = event.target.elements.maximumTokens?.value;

    const postData = {
      problemContext,
      problemStatement,
      technique,
      temperature,
      model,
    };

    if (['brainstorming', 'synectics'].includes(technique)) {
      postData.numIdeas = numIdeas;
      postData.tokensPerIdea = tokensPerIdea;
      postData.maximumTokens = maximumTokens;
    }

    dispatch(startIdeation(problemContext, problemStatement, technique, temperature, model, numIdeas, tokensPerIdea, maximumTokens));
    try {
      const baseURL = 'http://127.0.0.1:5001/conceptcloud-38d0c/us-central1'
      const response = await axios.post(`${baseURL}/ideation`, postData);

      // Remove the numbers from the ideas
      const ideas = response.data.ideas.map((idea) => idea.replace(/^\d+\.\s*/, ''));

      dispatch(receiveIdeas(ideas));
    } catch (error) {
      dispatch(ideationError(error.toString()));
    }
  };

  return (
    <form className="ideation-form" onSubmit={handleSubmit}>
      <label>
        Problem Context:
        <textarea name="problemContext" required />
      </label>
      <label>
        Problem Statement:
        <textarea name="problemStatement" required />
      </label>
      <label>
        Technique:
        <select name="technique" required onChange={(e) => setTechnique(e.target.value)}>
          <option value="">Select a technique...</option>
          <option value="brainstorming">Brainstorming</option>
          <option value="synectics">Synectics</option>
          <option value="morphologicalAnalysis">Morphological Analysis</option>
          <option value="scamper">SCAMPER</option>
          <option value="provocation">Provocation</option>
          <option value="sit">Systematic Inventive Thinking (SIT)</option>
          <option value="sixThinkingHats">Six Thinking Hats</option>
        </select>
      </label>
      <label>
        Temperature:
        <input type="number" name="temperature" min="0" max="1" step="0.1" defaultValue="0.5" required />
      </label>
      <label>
        Model:
        <select name="model" required>
          <option value="">Select a model...</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-4">gpt-4</option>
        </select>
      </label>
      {['brainstorming', 'synectics'].includes(technique) && (
        <>
          <label>
            Number of Ideas:
            <input type="number" name="numIdeas" min="1" defaultValue="5" required />
          </label>
          <label>
            Tokens Per Idea:
            <input type="number" name="tokensPerIdea" min="1" defaultValue="20" required />
          </label>
          <label>
            Maximum Tokens:
            <input type="number" name="maximumTokens" min="1" defaultValue="500" required />
          </label>
        </>
      )}
      <button type="submit">Generate Ideas</button>
    </form>
  );
};

export default IdeasForm;
