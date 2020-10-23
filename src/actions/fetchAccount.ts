import { AxiosResponse } from "axios";
import { api } from "../consts";
import { Account, Action, Response } from "../interfaces";

export const fetchAccount = (): ((
  dispatch: (action: Action<Account> | Action<string> | Action<boolean>) => void
) => Promise<void>) => {
  return async (dispatch: (action: Action<Account> | Action<string> | Action<boolean>) => void) => {
    const response: AxiosResponse<Response<Account>> = await api.get(
      `/account/${localStorage.getItem("accountID")}`,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.success) {
      const { data } = response.data;
      dispatch({ type: "LOGIN", payload: data } as Action<Account>);
      dispatch({ type: "UPDATE_ACCOUNT_ID", payload: localStorage.getItem("accountID") as string });
    } else {
      localStorage.clear();
      dispatch({ type: "UPDATE_SESSION", payload: false } as Action<boolean>);
    }
  };
};
