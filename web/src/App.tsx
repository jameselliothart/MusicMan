import React from 'react';
import './App.css';
import { defaultSongs, SongGrid } from './Songs/SongGrid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Your songs
        </p>
      </header>
      <body>
        <SongGrid songs={defaultSongs} />
      </body>
      <footer className="App-footer">
        <a
          className="App-link"
          href="https://icons8.com/icon/aKInTbkNvWT1/music-library"
          target="_blank"
          rel="noreferrer"
        >
          Music Library
        </a> icon by <a className="App-link" target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
