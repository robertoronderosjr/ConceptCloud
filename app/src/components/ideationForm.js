import React from 'react';
import { useDispatch } from 'react-redux';
import { startIdeation } from '../actions/ideationActions';

const IdeationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const problemContext = event.target.elements.problemContext.value;
    const problemStatement = event.target.elements.problemStatement.value;
    const technique = event.target.elements.technique.value;
    dispatch(startIdeation(problemContext, problemStatement, technique));
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
