import { Pages } from "../enums";
import { Action } from "../interfaces";

export const navigate = (page:Pages):Action<Pages> => {
  return ({
    type: "NAVIGATE",
    payload: page
  })
}