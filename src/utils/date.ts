export const toLocalDateString = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .split("T")[0];
};
