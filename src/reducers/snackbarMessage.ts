import { Action, Snackbar } from "../interfaces";

export const snackbarMessage = (msg: Snackbar = {value: "", severity: "success"}, action:Action<Snackbar>):Snackbar => {
  switch (action.type) {
    case "UPDATE_SNACKBAR":
      return action.payload;
    case "CLEAR_SNACKBAR":
      return {value: "", severity: "success"};
  }
  return msg;
}