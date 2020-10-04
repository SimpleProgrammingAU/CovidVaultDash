import { Action, ChecklistItem } from "../interfaces";

export const checklist = (checklist: ChecklistItem[] = [], action: Action<ChecklistItem> | Action<string>): ChecklistItem[] => {
  switch (action.type) {
    case "ADD_CHECK_ITEM":
      return [...checklist, action.payload as ChecklistItem];
    case "REMOVE_LIST_ITEM":
      return checklist.filter(({ id }) => id !== (action.payload as string));
    case "CLEAR_CHECKLIST":
      return [];
  }
  return checklist;
};
