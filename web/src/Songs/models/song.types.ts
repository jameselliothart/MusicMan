import { v4 as uuidv4 } from 'uuid';

export const MAX_FIELD_LENGTH = 100;

export type UUIDv4 = string;
type Artist = string;
type Album = string;
type Name = string;

export interface ISong {
  id: UUIDv4;
  artist: Artist;
  album: Album;
  name: Name;
};

export const newSongId = () => uuidv4();