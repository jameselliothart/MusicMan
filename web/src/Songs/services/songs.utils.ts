export const isValidFieldValue = (value: string, maxFieldLength: number) => {
  return value.length <= maxFieldLength && value.trim().length > 0;
};
