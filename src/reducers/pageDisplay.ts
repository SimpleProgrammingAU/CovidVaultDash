import { Pages } from "../enums";
import { Action } from "../interfaces";

export const pageDisplay = (page: Pages = Pages.login, action: Action<Pages>): Pages => {
  switch (action.type) {
    case "NAVIGATE":
      return action.payload;
  }
  return page;
};
