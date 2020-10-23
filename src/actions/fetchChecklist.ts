import { AxiosResponse } from "axios";
import { api } from "../consts";
import { Action, ChecklistItem, Response } from "../interfaces";

export const fetchChecklist = () => {
  return async (dispatch: (action: Action<ChecklistItem> | Action<undefined>) => void) => {
    const response: AxiosResponse<Response<ChecklistItem[]>> = await api.get(
      `/checklist/${localStorage.getItem("accountID")}`,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.success) {
      const { data } = response.data;
      dispatch({ type: "CLEAR_CHECKLIST", payload: undefined });
      data.forEach((payload) => {
        dispatch({ type: "ADD_CHECK_ITEM", payload });
      });
    }
  };
};
