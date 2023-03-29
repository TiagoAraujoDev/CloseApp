const MAX_LENGTH = 250;
const LAST_CHAR = MAX_LENGTH - 1;
const CHAR_TO_REMOVE_LIST = [".", ",", ":", ";"];

export const shortenText = (text: string): string => {
  const textLength = text.length;

  if (textLength > MAX_LENGTH) {
    let shortenedText = text.substring(0, MAX_LENGTH).trim();

    for (const char of CHAR_TO_REMOVE_LIST) {
      if (
        shortenedText[LAST_CHAR] === undefined &&
        shortenedText[LAST_CHAR - 1] === char
      ) {
        shortenedText = shortenedText.substring(0, MAX_LENGTH - 2);
      } else if (shortenedText[LAST_CHAR] === char) {
        shortenedText = shortenedText.substring(0, MAX_LENGTH - 1);
      }
    }

    return `${shortenedText}...`;
  }

  return text;
};
