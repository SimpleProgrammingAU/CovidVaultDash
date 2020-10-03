import { Action, FollowThru } from "../interfaces";

export const addFollowThru = (payload: FollowThru): Action<FollowThru> => {
  return {
    type: "ADD_LINK",
    payload,
  };
};
