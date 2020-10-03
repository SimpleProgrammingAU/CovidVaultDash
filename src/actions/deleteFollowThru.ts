import axios, { AxiosResponse } from "axios";
import { Action, Response, Snackbar } from "../interfaces";

export const deleteFollowThru = (id: string) => {
  return async (dispatch: (action: Action<Snackbar> | Action<boolean> | Action<string>) => void) => {
    const response: AxiosResponse<Response<{}>> = await axios.delete(`https://covidvault.com.au/api/followon/${id}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    if (response.data.success) {
      dispatch({ type: "REMOVE_LINK", payload: id });
      dispatch({ type: "UPDATE_SNACKBAR", payload: { value: "Follow thru link successfully deleted", severity: "success" } });
    } else {
      localStorage.clear();
      dispatch({ type: "UPDATE_SESSION", payload: false });
    }
  };
};
