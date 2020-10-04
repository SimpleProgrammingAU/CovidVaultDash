import axios, { AxiosResponse } from "axios";
import { Action, ChecklistItem, Response } from "../interfaces";

export const fetchChecklist = () => {
  return async (dispatch: (action: Action<ChecklistItem> | Action<undefined>) => void) => {
    const response: AxiosResponse<Response<ChecklistItem[]>> = await axios.get(
      `https://covidvault.com.au/api/checklist/${localStorage.getItem("accountID")}`,
      {
        validateStatus: () => true,
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
