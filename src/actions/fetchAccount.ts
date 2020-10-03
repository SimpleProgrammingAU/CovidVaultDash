import axios, { AxiosResponse } from "axios";
import { Account, Action, Response } from "../interfaces";

export const fetchAccount = (): ((dispatch: (action: Action<Account> | Action<boolean>) => void) => Promise<void>) => {
  return async (dispatch: (action: Action<Account> | Action<boolean>) => void) => {
    const response: AxiosResponse<Response<Account>> = await axios.get(
      `https://covidvault.com.au/api/account/${localStorage.getItem("accountID")}`,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.success) {
      const { data } = response.data;
      dispatch({type: "LOGIN", payload: data} as Action<Account>);
    } else {
      localStorage.clear();
      dispatch({ type: "UPDATE_SESSION", payload: false } as Action<boolean>);
    }
  };
};
