import { Action } from "../interfaces";

export const updateSession = (loggedIn:boolean):Action<boolean> => {
  return ({
    type: "UPDATE_SESSION",
    payload: loggedIn
  })
}