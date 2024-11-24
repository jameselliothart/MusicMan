import { ISongRow } from "../models/song-grid.types";

export const isValidFieldValue = (value: string, maxFieldLength: number) => {
  return value.length <= maxFieldLength && value.trim().length > 0;
};

export const updateSongRow = (songs: ISongRow[], updatedSong: ISongRow): ISongRow[] => {
  return songs.map(song =>
    song.id === updatedSong.id ? updatedSong : song
  );
};