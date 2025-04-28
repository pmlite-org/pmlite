export const convertDateToDateStr = (date: string | null | undefined) =>
  date ? new Date(date).toISOString().split("T")[0] : null;
