import { ISongRow } from "../models/song-grid.types";
import { isValidFieldValue, updateSongRow } from "./songs.utils";

describe('isValidFieldValue', () => {
  const maxFieldLength = 4;

  it('should return false for whitespace', () => {
    const value = ' ';

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeFalsy();
  });

  it('should return false for empty string', () => {
    const value = '';

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeFalsy();
  });

  it('should return false for values longer than the specified maximum length', () => {
    const value = '12345';

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeFalsy();
  });

  it('should return false for null values', () => {
    const value = null;

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeFalsy();
  });

  it('should pass for non-whitespace values up to the specified maximum length', () => {
    const value = '1234';

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeTruthy();
  });
});

describe('updateRow', () => {
  it('should preserve song order', () => {
    const songs: ISongRow[] = [
      ISongRow.create({ id: '04a74f30-1ac7-476c-8c8c-94f36410b9f7', artist: 'art1', album: 'debut', name: 'an ode' }),
      ISongRow.create({ id: 'bff02006-2112-422c-96da-11a7aba8d519', artist: 'art1', album: 'debut', name: 'second ode' }),
      ISongRow.create({ id: '84256690-a321-4ba2-82fc-53ff4952cb3a', artist: 'art2', album: 'first break', name: 'something different' }),
    ];
    const updatedValue = 'updated!'
    const updatedSong = ISongRow.create({ id: 'bff02006-2112-422c-96da-11a7aba8d519', artist: 'art1', album: updatedValue, name: 'second ode' })

    const actual = updateSongRow(songs, updatedSong);

    expect(actual[1].album).toEqual(updatedValue);
    expect(actual.map(song => song.id)).toEqual(songs.map(song => song.id));
  })
})