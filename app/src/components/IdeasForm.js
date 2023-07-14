import React from 'react';
import '../styles/IdeasForm.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { startIdeation, receiveIdeas, ideationError } from '../actions/ideationActions';

const IdeationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const problemContext = event.target.elements.problemContext.value;
    const problemStatement = event.target.elements.problemStatement.value;
    const technique = event.target.elements.technique.value;
    const temperature = event.target.elements.temperature.value;
    const model = event.target.elements.model.value;
    const numIdeas = event.target.elements.numIdeas.value;
    const tokensPerIdea = event.target.elements.tokensPerIdea.value;
    const maximumTokens = event.target.elements.maximumTokens.value;
    dispatch(startIdeation(problemContext, problemStatement, technique, temperature, model, numIdeas, tokensPerIdea, maximumTokens));
    try {
      const baseURL = 'http://127.0.0.1:5001/conceptcloud-38d0c/us-central1'
      const response = await axios.post(`${baseURL}/ideation`, {
        problemContext,
        problemStatement,
        technique,
      });

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
        <select name="technique" required>
          <option value="">--Please choose an option--</option>
          <option value="brainstorming">Brainstorming</option>
          <option value="synectics">Synectics</option>
          <option value="morphologicalAnalysis">Morphological Analysis</option>
          <option value="scamper">SCAMPER</option>
          <option value="provocation">Provocation-Based Ideation</option>
          <option value="sit">Systematic Inventive Thinking (SIT)</option>
          <option value="sixThinkingHats">Six Thinking Hats</option>
        </select>
      </label>
      <label>
        Temperature:
        <input type="number" name="temperature" min="0" max="1" step="0.1" required />
      </label>
      <label>
        Model:
        <input type="text" name="model" required />
      </label>
      <label>
        Number of Ideas:
        <input type="number" name="numIdeas" min="1" required />
      </label>
      <label>
        Tokens Per Idea:
        <input type="number" name="tokensPerIdea" min="1" required />
      </label>
      <label>
        Maximum Tokens:
        <input type="number" name="maximumTokens" min="1" required />
      </label>
      <button type="submit">Generate Ideas</button>
    </form>
  );
};

export default IdeationForm;
