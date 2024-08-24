import React, { Component } from 'react';

class Player extends Component {
  render() {
    const { currentSong } = this.props;
    return (
      <div className="player">
        <h2>Now Playing: {currentSong ? currentSong.title : "No song selected"}</h2>
        <audio id="audioPlayer" controls>
          <source src={currentSong ? currentSong.url : ""} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}

export default Player;
