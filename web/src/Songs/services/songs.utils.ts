import { ISong } from "../models/song.types";

export const isValidFieldValue = (value: string, maxFieldLength: number) => {
  return value.length <= maxFieldLength && value.trim().length > 0;
};

export const updateSongRow = (songs: ISong[], updatedSong: ISong): ISong[] => {
  return songs.map(song =>
    song.id === updatedSong.id ? updatedSong : song
  );
};