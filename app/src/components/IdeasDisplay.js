import React from 'react';
import { useSelector } from 'react-redux';

const IdeasDisplay = () => {
  const loading = useSelector((state) => state.ideation.loading);
  const ideas = useSelector((state) => state.ideation.ideas);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        ideas.map((idea, index) => (
          <p key={index}>{idea}</p>
        ))
      )}
    </div>
  );
};

export default IdeasDisplay;
