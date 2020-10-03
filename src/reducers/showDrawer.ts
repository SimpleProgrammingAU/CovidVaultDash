import { Action } from "../interfaces";

export const showDrawer = (show: boolean = true, action:Action<boolean>):boolean => {
  switch(action.type){
    case "TOGGLE_DRAWER":
      return !show;
    case "SET_DRAWER":
      return action.payload;
  }
  return show;
}