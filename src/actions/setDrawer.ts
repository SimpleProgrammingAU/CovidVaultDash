import { Action } from "../interfaces"

export const setDrawer = (open:boolean):Action<boolean> => {
  return ({
    type: "SET_DRAWER",
    payload: open
  })
}