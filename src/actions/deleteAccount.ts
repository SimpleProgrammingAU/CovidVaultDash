import { AxiosResponse } from "axios"
import { api } from "../consts";
import { Action, Response } from "../interfaces";

export const deleteAccount = (id:string) => {
  return async (dispatch: (action: Action<boolean> | Action<undefined>) => void) => {
    const response: AxiosResponse<Response<{}>> = await api.delete(
      `/account/${localStorage.getItem("accountID")}`,{
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.success) {
      dispatch({type: "DELETE_ACCOUNT", payload: undefined});
    } else {
      localStorage.clear();
      dispatch({ type: "UPDATE_SESSION", payload: false });
    }
  }
}