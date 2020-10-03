import axios, { AxiosResponse } from "axios";
import { Action, FollowThru, Response } from "../interfaces";

export const fetchFollowThru = () => {
  return async (dispatch: (action: Action<FollowThru> | Action<undefined>) => void) => {
    const response: AxiosResponse<Response<FollowThru[]>> = await axios.get(
      `https://covidvault.com.au/api/followon/${localStorage.getItem("accountID")}`,
      {
        validateStatus: () => true,
      }
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
