import axios, { AxiosResponse } from "axios";
import { Action, Response, Snackbar } from "../interfaces";

export const deleteCondition = (id: string) => {
  return async (dispatch: (action: Action<Snackbar> | Action<boolean> | Action<string>) => void) => {
    const response: AxiosResponse<Response<{}>> = await axios.delete(`https://covidvault.com.au/api/checklist/${id}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    if (response.data.success) {
      dispatch({ type: "REMOVE_LIST_ITEM", payload: id });
      dispatch({ type: "UPDATE_SNACKBAR", payload: { value: "Follow thru link successfully deleted", severity: "success" } });
    }
  };
};
