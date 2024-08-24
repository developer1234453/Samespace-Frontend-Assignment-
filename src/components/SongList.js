import React from 'react';

const SongList = ({ songs, onSongChange }) => {
  return (
    <div className="song-list">
      {songs && songs.map((song, index) => (
        <div key={index} onClick={() => onSongChange(song)}>
          {song.title} - {song.artist}
        </div>
      ))}
    </div>
  );
};

export default SongList;
