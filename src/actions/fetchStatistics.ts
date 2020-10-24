import { AxiosResponse } from "axios";
import { api } from "../consts";
import { Action, Response, Statistics } from "../interfaces";

export const fetchStatistics = () => {
  return async (dispatch: (action: Action<Statistics>) => void) => {
    const response: AxiosResponse<Response<Statistics>> = await api.get(`/statistics/${localStorage.getItem("accountID")}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    if (response.data.success) {
      const { data } = response.data;
      dispatch({ type: "IMPORT_STATS", payload: data });
    }
  };
};
