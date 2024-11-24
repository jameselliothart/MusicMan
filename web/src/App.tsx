import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { SongGrid } from './Songs/components/SongGrid';
import { ISong } from './Songs/models/song.types';
import { deleteSong, fetchSongs } from './Songs/services/songs.api';
import { SongGridRowClickHandler } from './Songs/models/song-grid.types';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const songsResult = await fetchSongs();
        if (songsResult.ok) {
          setSongs(songsResult.value);
        } else {
          console.error(songsResult.error);
          setError(`Error: ${songsResult.error}`);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadSongs();
  }, []);

  const handleDelete: SongGridRowClickHandler = async (songRow) => {
    if (!songRow.data) {
      console.error('No song row data received');
      return;
    }
    const id = songRow.data.id;
    const deleteResult = await deleteSong(id);
    if (deleteResult.ok) {
      setSongs((prevSongs) => prevSongs.filter(s => s.id !== id));
      toast.success(`Removed ${songRow.data.artist} - ${songRow.data.album} - ${songRow.data.name}`);
    } else {
      toast.error(`${deleteResult.error}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Your songs
        </p>
      </header>

      <main>
        {loading && <p>Loading Songs...</p>}
        {error && <p>Sorry! Your songs are unavailable right now. Please try again later.</p>}
        {!loading && !error && <SongGrid songs={songs} onDelete={handleDelete} />}
      </main>

      <footer className="App-footer">
        <a
          className="App-link"
          href="https://icons8.com/icon/aKInTbkNvWT1/music-library"
          target="_blank"
          rel="noreferrer"
        >
          Music Library
        </a>{' '}
        icon by{' '}
        <a className="App-link" target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
      </footer>

      <ToastContainer
        position='bottom-left'
        theme='dark'
      />

    </div>
  );
}

export default App;
