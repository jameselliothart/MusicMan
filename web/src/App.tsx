import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { SongGrid } from './Songs/components/SongGrid';
import { ISong, MAX_FIELD_LENGTH } from './Songs/models/song.types';
import { addSong, deleteSong, fetchSongs, updateSong } from './Songs/services/songs.api';
import { ISongRow, SongGridRowClickHandlerAsync, SongGridRowClickHandler } from './Songs/models/song-grid.types';
import { toast, ToastContainer } from 'react-toastify';
import { AddSongForm } from './Songs/components/AddSongForm';
import { isValidSong, updateSongRow } from './Songs/services/songs.utils';

function App() {
  const [songs, setSongs] = useState<ISongRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const songsResult = await fetchSongs();
        if (songsResult.ok) {
          const songRows = songsResult.value.map(s => ISongRow.create(s))
          setSongs(songRows);
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

  const handleDelete: SongGridRowClickHandlerAsync = async (songRow) => {
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

  const handleAdd = async (song: ISong) => {
    const addResult = await addSong(song);
    if (addResult.ok) {
      setSongs((prevSongs) => prevSongs.concat(ISongRow.create(song)));
      toast.success(`Added ${song.artist} - ${song.album} - ${song.name}`)
    } else {
      console.log(`${addResult.error}`);
      toast.error("Uh oh that didn't work. Please try later.")
    }
  }

  const handleUpdate: SongGridRowClickHandlerAsync = async (updatedSongRow) => {
    if (!updatedSongRow.data) {
      console.error('No song row data received');
      return;
    }
    const updatedSong: ISong = {
      id: updatedSongRow.data.id,
      artist: updatedSongRow.data.artist?.trim(),
      album: updatedSongRow.data.album?.trim(),
      name: updatedSongRow.data.name?.trim(),
    }
    if (!isValidSong(updatedSong)) {
      toast.error(`Bad song data: Artist / Album / Name are required and must be less than ${MAX_FIELD_LENGTH} characters`);
      return;
    }
    const updateResult = await updateSong(updatedSong);
    if (updateResult.ok) {
      setSongs((prevSongs) => updateSongRow(prevSongs, ISongRow.create(updatedSong)));
      toast.success(`Updated ${updatedSong.artist} - ${updatedSong.album} - ${updatedSong.name}`)
    } else {
      toast.error(`${updateResult.error}`);
    }
  }

  const handleEditClick: SongGridRowClickHandler = clickedSongRow => {
    // enables editing on the clicked Song row
    // getRowId property required on the AgGridReact for getRowNode to work
    const rowNode = clickedSongRow.api.getRowNode(clickedSongRow.data!.id)!;
    const newRowData: ISongRow = { ...clickedSongRow.data!, editable: true};
    rowNode.updateData(newRowData);
    clickedSongRow.api.refreshCells({
      force: true,
      rowNodes: [rowNode]
    })

    // starts editing in the row's Artist cell
    clickedSongRow.api.startEditingCell({
      rowIndex: clickedSongRow.node.rowIndex!,
      colKey: 'artist'
    });
  }

  const noRowsMessage = error ?
    'Sorry! Your songs are unavailable right now. Please try again later.' :
    'You have no songs. Try adding some!'

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Your songs
        </p>
      </header>

      <main className='App-main'>
        <div className='content-container'>
          <div className='add-song'>
            <AddSongForm onSave={handleAdd} />
          </div>
          <div className="grid-container">
            {loading && <p>Loading Songs...</p>}
            {
              !loading && <SongGrid songs={songs} noRowsMessage={noRowsMessage}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onEditClick={handleEditClick}
              />
            }
          </div>
        </div>
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
        theme='dark'
      />

    </div>
  );
}

export default App;
