import axios from "axios";
import { ISong, UUIDv4 } from "../models/song.types";
import { defaultSongs } from "../components/SongGrid";
import { Result } from "../../shared/result";

const api = axios.create({
  baseURL: '',
});

export const fetchSongs = async () => {
  try {
    console.log('Fetching all songs')
    // const response = await api.get<ISong[]>('/songs');
    // console.log(response.data);

    const data = Promise.resolve(defaultSongs);
    const songData = await data;
    return Result.Ok(songData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Result.Error(error.message);
      // console.error('Axios error:', error.response?.status); // HTTP status code
      // console.error('Error message:', error.message); // Error message
    } else {
      return Result.Error(error);
    }
  }
};

export const deleteSong = async (id: UUIDv4) => {
  console.log(`Deleting song id '${id}'`);
  // const response = await axios.delete(`/songs/${id}`);
  const result = Promise.resolve(Result.Ok(1));
  return result;
};

export const addSong = async (song: ISong) => {
  console.log('Adding song', song);
  // const response = await api.post('', song);
  const result = Promise.resolve(Result.Ok(1));
  return result;
}