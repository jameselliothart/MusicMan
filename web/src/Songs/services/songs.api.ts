import { ISong, UUIDv4 } from "../models/song.types";
import { Result } from "../../shared/result";

const BASE_URI = `${process.env.REACT_APP_API_URL}/api/songs`;

const HEADERS = new Headers();
HEADERS.append("Content-Type", "application/json");

export const fetchSongs = async () => {
  const uri = BASE_URI;
  console.log(uri, 'Fetching all songs')
  try {
    const response = await fetch(uri,
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
  const uri = `${BASE_URI}/${id}`;
  console.log(uri, `Deleting song`);
  try {
    const response = await fetch(uri,
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
  const uri = BASE_URI;
  console.log(uri, 'Adding song', song);
  try {
    const response = await fetch(uri,
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
  const uri = BASE_URI;
  console.log(uri, 'Updating song', song);
  try {
    const response = await fetch(uri,
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