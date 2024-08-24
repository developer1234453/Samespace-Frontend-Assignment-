import React, { Component } from 'react';
import './App.css'; // Import the CSS file
import Player from './components/Player';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import MusicControls from './components/MusicControls';

class App extends Component {
  state = {
    songs: [
      { title: 'Canon in D Major', artist: 'Johann Pachelbel', url: 'https://www.bensound.com/bensound-music/bensound-clearday.mp3' },
      { title: 'Moonlight Sonata', artist: 'Ludwig van Beethoven', url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3' },
      { title: 'Für Elise', artist: 'Ludwig van Beethoven', url: 'https://www.bensound.com/bensound-music/bensound-happiness.mp3' },
      { title: 'Nocturne in E-flat Major', artist: 'Frédéric Chopin', url: 'https://www.bensound.com/bensound-music/bensound-littleidea.mp3' },
      { title: 'The Four Seasons - Spring', artist: 'Antonio Vivaldi', url: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3' },
      { title: 'Air on the G String', artist: 'Johann Sebastian Bach', url: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3' },
      { title: 'Clair de Lune', artist: 'Claude Debussy', url: 'https://www.bensound.com/bensound-music/bensound-memories.mp3' },
      { title: 'Swan Lake', artist: 'Pyotr Ilyich Tchaikovsky', url: 'https://www.bensound.com/bensound-music/bensound-love.mp3' },
      { title: 'Hungarian Rhapsody No. 2', artist: 'Franz Liszt', url: 'https://www.bensound.com/bensound-music/bensound-epic.mp3' },
      { title: 'Ode to Joy', artist: 'Ludwig van Beethoven', url: 'https://www.bensound.com/bensound-music/bensound-adventure.mp3' }
    ],
    currentSong: null,
    searchTerm: '',
    isPlaying: false,
  };

  componentDidMount() {
    this.audio = new Audio();
    this.audio.addEventListener('ended', this.handleNext); // Move to the next song when current song ends
  }

  handleSongChange = (selectedSong) => {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.setState({ currentSong: selectedSong, isPlaying: true }, () => {
      this.audio.src = this.state.currentSong.url;
      this.audio.load(); // Ensure the audio is properly loaded before playing
      this.audio.play().catch((error) => console.error('Error playing audio:', error));
    });
  };

  handlePlay = () => {
    if (this.audio) {
      this.audio.play().catch((error) => console.error('Error playing audio:', error));
      this.setState({ isPlaying: true });
    }
  };

  handlePause = () => {
    if (this.audio) {
      this.audio.pause();
      this.setState({ isPlaying: false });
    }
  };

  handleNext = () => {
    const { songs, currentSong } = this.state;
    if (songs.length > 0) {
      const currentIndex = songs.indexOf(currentSong);
      const nextIndex = (currentIndex + 1) % songs.length;
      this.handleSongChange(songs[nextIndex]);
    }
  };

  handleSearchChange = (term) => {
    this.setState({ searchTerm: term });
  };

  render() {
    const filteredSongs = this.state.songs.filter(song =>
      song.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Music Player</h1>
        <SearchBar searchTerm={this.state.searchTerm} onSearchChange={this.handleSearchChange} />
        <SongList songs={filteredSongs} onSongChange={this.handleSongChange} />
        <Player currentSong={this.state.currentSong} />
        <MusicControls
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onNext={this.handleNext}
        />
      </div>
    );
  }
}

export default App;
