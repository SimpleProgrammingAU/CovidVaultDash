import { Action, Statistics } from "../interfaces";

export const statistics = (
  stats: Statistics = {
    byDay: [],
    byHour: [],
    return: 0,
    today: 0,
    api: [],
  },
  action: Action<Statistics>
): Statistics => {
  switch (action.type) {
    case "IMPORT_STATS":
      return action.payload;
  }
  return stats;
};
