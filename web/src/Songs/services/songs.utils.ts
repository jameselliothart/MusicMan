import { ISongRow } from "../models/song-grid.types";
import { ISong, MAX_FIELD_LENGTH } from "../models/song.types";

type MaybeString = string | null

export const isValidFieldValue = (value: MaybeString, maxFieldLength: number) => {
  // value will be trimmed when Song is created to remove whitespace
  const length = value?.trim().length ?? Number.POSITIVE_INFINITY;
  const trimmedLength = value?.trim().length ?? 0;
  return length <= maxFieldLength && trimmedLength > 0;
};

export const updateSongRow = (songs: ISongRow[], updatedSong: ISongRow): ISongRow[] => {
  return songs.map(song =>
    song.id === updatedSong.id ? updatedSong : song
  );
};

export const isValidSong = (song: ISong): boolean => {
  const checkFields = [
    isValidFieldValue(song.artist, MAX_FIELD_LENGTH),
    isValidFieldValue(song.album, MAX_FIELD_LENGTH),
    isValidFieldValue(song.name, MAX_FIELD_LENGTH),
  ]
  return checkFields.every(x => x);
};