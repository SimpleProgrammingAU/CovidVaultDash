import { Action } from "../interfaces";

export const clearSnackbar = ():Action<undefined> => {
  return ({
    type: "CLEAR_SNACKBAR",
    payload: undefined
  })
}