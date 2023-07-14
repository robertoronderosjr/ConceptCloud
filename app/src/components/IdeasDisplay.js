import React from 'react';
import { useSelector } from 'react-redux';

const IdeasDisplay = () => {
  const ideas = useSelector((state) => state.ideation.ideas);

  return (
    <div>
      {ideas.map((idea, index) => (
        <p key={index}>{idea}</p>
      ))}
    </div>
  );
};

export default IdeasDisplay;
