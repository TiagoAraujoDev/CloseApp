import dayjs from "dayjs";

export function formatDate(date: string): string {
  const dateFormated = dayjs(date).format("MMMM D, YYYY");

  return dateFormated;
}
