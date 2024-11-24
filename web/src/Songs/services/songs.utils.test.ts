import { isValidFieldValue } from "./songs.utils";

describe('isValidFieldValue', () => {
  const maxFieldLength = 4;

  it('should fail for whitespace', () => {
    const value = ' ';

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeFalsy();
  });

  it('should fail for values longer than the specified maximum length', () => {
    const value = '12345';

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeFalsy();
  });

  it('should pass for non-whitespace values up to the specified maximum length', () => {
    const value = '1234';

    const actual = isValidFieldValue(value, maxFieldLength);

    expect(actual).toBeTruthy();
  });
});
