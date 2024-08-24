
import React from 'react';

const MusicControls = ({ onPlay, onPause, onNext }) => {
  return (
    <div className="MusicControls">
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default MusicControls;
