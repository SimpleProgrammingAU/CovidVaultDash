export default interface Statistics {
  byDay: number[];
  byHour: number[];
  return: number;
  today: number;
  api: {
    year: number;
    month: number;
    count: number;
  }[];
}
