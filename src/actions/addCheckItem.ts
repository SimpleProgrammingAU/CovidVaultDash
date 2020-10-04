import { Action, ChecklistItem } from "../interfaces";

export const addCheckItem = (payload: ChecklistItem): Action<ChecklistItem> => {
  return {
    type: "ADD_CHECK_ITEM",
    payload,
  };
};
