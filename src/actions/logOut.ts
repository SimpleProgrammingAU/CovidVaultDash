import { Action } from "../interfaces";

export const logOut = (): Action<undefined> => {
  return {
    type: "RESET_ALL",
    payload: undefined,
  };
};
