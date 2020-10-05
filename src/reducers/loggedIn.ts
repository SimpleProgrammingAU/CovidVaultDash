import { Action } from "../interfaces";

export const loggedIn = (loggedIn:boolean = false, action:Action<boolean> ):boolean => {
  switch (action.type) {
    case "UPDATE_SESSION":
      return action.payload;
    case "RESET_ALL":
      return false;
  }
  return loggedIn;
}