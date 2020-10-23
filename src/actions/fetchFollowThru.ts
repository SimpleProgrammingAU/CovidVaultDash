import { AxiosResponse } from "axios";
import { api } from "../consts";
import { Action, FollowThru, Response } from "../interfaces";

export const fetchFollowThru = () => {
  return async (dispatch: (action: Action<FollowThru> | Action<undefined>) => void) => {
    const response: AxiosResponse<Response<FollowThru[]>> = await api.get(
      `/followon/${localStorage.getItem("accountID")}`,
    );
    if (response.data.success) {
      const { data } = response.data;
      dispatch({ type: "CLEAR_LINKS", payload: undefined });
      data.forEach((payload) => {
        dispatch({ type: "ADD_LINK", payload });
      });
    }
  };
};
