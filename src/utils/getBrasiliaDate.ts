export function getBrasiliaDate() {
  const ISODateString = new Date();

  const startTime = new Date(ISODateString);
  const brasiliaTIme = new Date(
    startTime.getTime() - startTime.getTimezoneOffset() * 60000,
  );

  return brasiliaTIme;
}

export function getFiveMinutesAgoDate() {
  const currentTime = getBrasiliaDate();

  const fiveMinutesSeconds = 60 * 5 * 6;

  const fiveMinutesAgoDate = new Date(
    currentTime.getTime() -
      currentTime.getTimezoneOffset() -
      fiveMinutesSeconds,
  );

  return fiveMinutesAgoDate;
}
