import { Action } from "../interfaces"

export const toggleDrawer = ():Action<undefined> => {
  return ({
    type: "TOGGLE_DRAWER",
    payload: undefined
  })
}