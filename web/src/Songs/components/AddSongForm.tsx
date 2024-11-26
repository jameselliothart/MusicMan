import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { isValidFieldValue } from '../services/songs.utils';
import { ISong, MAX_FIELD_LENGTH, newSongId } from '../models/song.types';

interface AddSongFormProps {
  onSave: (song: ISong) => Promise<void>;
}

export const AddSongForm = ({ onSave }: AddSongFormProps) => {
  const [open, setOpen] = React.useState(false);
  const [artist, setArtist] = React.useState('');
  const [album, setAlbum] = React.useState('');
  const [name, setName] = React.useState('');
  const [hasErrors, setHasErrors] = React.useState({
    artist: true,
    album: true,
    name: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetState = () => {
    setOpen(false);
    setArtist('');
    setAlbum('');
    setName('');
  };

  React.useEffect(() => {
    const errors = {
      artist: !isValidFieldValue(artist, MAX_FIELD_LENGTH),
      album: !isValidFieldValue(album, MAX_FIELD_LENGTH),
      name: !isValidFieldValue(name, MAX_FIELD_LENGTH),
    }
    setHasErrors(errors)
  }, [open, artist, album, name]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newValue = e.target.value;
    setter(newValue);
  };

  return (
    <React.Fragment>
      <p>Add a song</p>
      <span onClick={handleClickOpen} className="clickable"><AddIcon /></span>
      <Dialog
        open={open}
        onClose={resetState}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const song: ISong = {
              id: newSongId(),
              artist: formJson.artist,
              album: formJson.album,
              name: formJson.name,
            }
            await onSave(song);
            resetState();
          },
        }}
      >
        <DialogTitle>Add a song to your collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="artist"
            name="artist"
            label="Artist"
            value={artist}
            onChange={e => handleChange(e, setArtist)}
            fullWidth
            variant="standard"
            error={artist.length > MAX_FIELD_LENGTH}
            helperText={
              artist.length > MAX_FIELD_LENGTH
                ? `Exceeds maximum of ${MAX_FIELD_LENGTH} characters by ${(artist.length - MAX_FIELD_LENGTH)}`
                : ''
            }
          />
          <TextField
            required
            margin="dense"
            id="album"
            name="album"
            label="Album"
            value={album}
            onChange={e => handleChange(e, setAlbum)}
            fullWidth
            variant="standard"
            error={album.length > MAX_FIELD_LENGTH}
            helperText={
              album.length > MAX_FIELD_LENGTH
                ? `Exceeds maximum of ${MAX_FIELD_LENGTH} characters by ${(album.length - MAX_FIELD_LENGTH)}`
                : ''
            }
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            value={name}
            onChange={e => handleChange(e, setName)}
            fullWidth
            variant="standard"
            error={name.length > MAX_FIELD_LENGTH}
            helperText={
              name.length > MAX_FIELD_LENGTH
                ? `Exceeds maximum of ${MAX_FIELD_LENGTH} characters by ${(name.length - MAX_FIELD_LENGTH)}`
                : ''
            }
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={Object.values(hasErrors).some(e => e)}>Save</Button>
          <Button onClick={resetState}>Never Mind</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
