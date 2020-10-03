import axios, { AxiosResponse } from "axios";
import { ThunkAction } from "redux-thunk";
import { Account, Action, Response, Snackbar } from "../interfaces";

export const patchAccount = (): ThunkAction<Promise<void>, { account: Account }, {}, Action<Snackbar>> => {
  return async (dispatch, getState) => {
    const account = getState().account;
    const response: AxiosResponse<Response<Account>> = await axios.patch(
      `https://covidvault.com.au/api/account/${localStorage.getItem("accountID")}`,
      {
        name: account.name,
        abn: account.abn,
        authContact: account.authContact,
        phone: account.phone,
        streetAddress: account.streetAddress,
        suburb: account.suburb,
        state: account.state,
        postcode: account.postcode,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    if (response.data.success)
      dispatch({ type: "UPDATE_SNACKBAR", payload: { value: "Logo successfully updated.", severity: "success" } });
    else dispatch({ type: "UPDATE_SNACKBAR", payload: { value: "Account update failed.", severity: "error" } });
  };
};
