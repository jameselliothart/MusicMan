import { ISong, UUIDv4 } from "../models/song.types";
import { Result } from "../../shared/result";

const BASE_URI = 'http://localhost:5298/api/songs';

const HEADERS = new Headers();
HEADERS.append("Content-Type", "application/json");

export const fetchSongs = async () => {
  console.log('Fetching all songs')
  try {
    const response = await fetch(BASE_URI,
      {
        method: 'GET',
        headers: HEADERS,
      }
    );
    const songs: ISong[] = await response.json();
    const result = response.ok ? Result.Ok(songs) : Result.Error(response.status);
    return result;
  } catch (error) {
    return Result.Error(error)
  }
};

export const deleteSong = async (id: UUIDv4) => {
  console.log(`Deleting song id '${id}'`);
  try {
    const response = await fetch(`${BASE_URI}/${id}`,
      {
        method: 'DELETE',
        headers: HEADERS,
      }
    );
    const result = response.ok ? Result.Ok('') : Result.Error(response.status);
    return result;
  } catch (error) {
    return Result.Error(error)
  }
};

export const addSong = async (song: ISong) => {
  console.log('Adding song', song);
  try {
    const response = await fetch(BASE_URI,
      {
        method: 'POST',
        body: JSON.stringify(song),
        headers: HEADERS,
      }
    );
    const result = response.ok ? Result.Ok('') : Result.Error(response.status);
    return result;
  } catch (error) {
    return Result.Error(error)
  }
}

export const updateSong = async (song: ISong) => {
  console.log('Updating song', song);
  try {
    const response = await fetch(BASE_URI,
      {
        method: 'PUT',
        body: JSON.stringify(song),
        headers: HEADERS,
      }
    );
    const result = response.ok ? Result.Ok('') : Result.Error(response.status);
    return result;
  } catch (error) {
    return Result.Error(error)
  }
}