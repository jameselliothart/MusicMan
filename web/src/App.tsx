import React from 'react';
import './App.css';
import { defaultSongs, SongGrid } from './Songs/grid';

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
    </div>
  );
}

export default App;
