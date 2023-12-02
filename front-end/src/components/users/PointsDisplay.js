// src/components/PointsDisplay.js
import React from 'react';

const PointsDisplay = ({ points }) => {
  return (
    <div className=" text-blue-400 p-1 rounded-md">
      <p className="text-lg font-bold pb-1">Points: <span className='text-yellow-500 text-2xl'>{points}</span></p>
    </div>
  );
};

export default PointsDisplay;
