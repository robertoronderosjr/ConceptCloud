import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startIdeation, receiveIdeas, ideationError } from '../actions/ideationActions';
import axios from 'axios';
import '../styles/IdeasForm.css';

const IdeasForm = () => {
  const dispatch = useDispatch();
  const [technique, setTechnique] = useState('');
  const [formState, setFormState] = useState({ problemContext: '', problemStatement: '' });
  const baseURL = 'http://127.0.0.1:5001/conceptcloud-38d0c/us-central1/ideation'

  const handleSubmit = async (event) => {
    event.preventDefault();
    const problemContext = event.target.elements.problemContext.value;
    const problemStatement = event.target.elements.problemStatement.value;
    const technique = event.target.elements.technique.value;
    const temperature = parseFloat(event.target.elements.temperature.value);
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
      postData.numIdeas = parseInt(numIdeas, 10);
      postData.tokensPerIdea = parseInt(tokensPerIdea, 10);
      postData.maximumTokens = parseInt(maximumTokens, 10);
    }

    dispatch(startIdeation(problemContext, problemStatement, technique, temperature, model, numIdeas, tokensPerIdea, maximumTokens));
    try {
      const response = await axios.post(`${baseURL}/`, postData);

      // Check if the ideas field is a string or an array
      let ideas;
      if (typeof response.data.ideas === 'string') {
        // If it's a string, split it into an array using the newline character as the delimiter
        ideas = response.data.ideas.split('\n\n');
      } else {
        // If it's an array, remove the numbers from the ideas
        ideas = response.data.ideas.map((idea) => idea.replace(/^\d+\.\s*/, ''));
      }

      dispatch(receiveIdeas(ideas));
    } catch (error) {
      dispatch(ideationError(error.toString()));
    }
  };

  const handleEnhanceText = async (field) => {
    // Get the current content of the field
    const text = formState[field];
  
    // Send a request to the new endpoint
    const response = await axios.post(`${baseURL}/enhance`, { text });
  
    // Update the content of the field with the enhanced text
    setFormState({
      ...formState,
      [field]: response.data.enhancedText,
    });
  };

  return (
    <form className="ideation-form" onSubmit={handleSubmit}>
      <label htmlFor="problemContext">Problem Context:</label>
      <textarea id="problemContext" name="problemContext" required value={formState.problemContext} onChange={(e) => setFormState({ ...formState, problemContext: e.target.value })} />
      <button type="button" onClick={() => handleEnhanceText('problemContext')}>Enhance Text</button>
      <label htmlFor="problemStatement">Problem Statement:</label>
      <textarea id="problemStatement" name="problemStatement" required value={formState.problemStatement} onChange={(e) => setFormState({ ...formState, problemStatement: e.target.value })} />
      <button type="button" onClick={() => handleEnhanceText('problemStatement')}>Enhance Text</button>
      <div className="options-group">
        <div className="input-group">
          <label htmlFor="technique">Technique:</label>
          <select id="technique" name="technique" required onChange={(e) => setTechnique(e.target.value)}>
            <option value="">Select a technique...</option>
            <option value="brainstorming">Brainstorming</option>
            <option value="synectics">Synectics</option>
            <option value="morphologicalAnalysis">Morphological Analysis</option>
            <option value="scamper">SCAMPER</option>
            <option value="provocation">Provocation</option>
            <option value="sit">Systematic Inventive Thinking (SIT)</option>
            <option value="sixThinkingHats">Six Thinking Hats</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="temperature">Temperature:</label>
          <input id="temperature" type="number" name="temperature" min="0" max="1" step="0.1" defaultValue="0.5" required />
        </div>
        <div className="input-group">
          <label htmlFor="model">Model:</label>
          <select id="model" name="model" required>
            <option value="">Select a model...</option>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-4">gpt-4</option>
          </select>
        </div>
        {['brainstorming', 'synectics'].includes(technique) && (
          <>
            <div className="input-group">
              <label htmlFor="numIdeas">Number of Ideas:</label>
              <input id="numIdeas" type="number" name="numIdeas" min="1" defaultValue="5" required />
            </div>
            <div className="input-group">
              <label htmlFor="tokensPerIdea">Tokens Per Idea:</label>
              <input id="tokensPerIdea" type="number" name="tokensPerIdea" min="1" defaultValue="20" required />
            </div>
            <div className="input-group">
              <label htmlFor="maximumTokens">Maximum Tokens:</label>
              <input id="maximumTokens" type="number" name="maximumTokens" min="1" defaultValue="500" required />
            </div>
          </>
        )}
      </div>
      <button type="submit">Generate Ideas</button>
    </form>
  );
};

export default IdeasForm;
