import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { startIdeation, receiveIdeas } from '../actions/ideationActions';

const IdeationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const problemContext = event.target.elements.problemContext.value;
    const problemStatement = event.target.elements.problemStatement.value;
    const technique = event.target.elements.technique.value;
    dispatch(startIdeation(problemContext, problemStatement, technique));
    try {
      const baseURL = 'http://127.0.0.1:5001/conceptcloud-38d0c/us-central1'
      const response = await axios.post(`${baseURL}/ideation`, {
        problemContext,
        problemStatement,
        technique,
      });
      dispatch(receiveIdeas(response.data.ideas));
    } catch (error) {
      console.error('Error generating ideas:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Generate Ideas</button>
    </form>
  );
};

export default IdeationForm;
