import axios, { AxiosResponse } from "axios";
import { Action, Response, Session } from "../interfaces";

export const checkSession = ():Action<boolean> | ((dispatch: (action: Action<boolean>) => void) => Promise<void>) => {
  if (
    !localStorage.getItem("accountID") ||
    !localStorage.getItem("sessionID") ||
    !localStorage.getItem("accessToken") ||
    !localStorage.getItem("refreshToken") ||
    !localStorage.getItem("accessExpiry") ||
    !localStorage.getItem("refreshExpiry")
  ) {
    localStorage.clear();
    return {
      type: "UPDATE_SESSION",
      payload: false,
    };
  }

  //If accessExpiry remains current, assume logged in
  if (Date.now() < parseInt(localStorage.getItem("accessExpiry") as string)) {
    return {
      type: "UPDATE_SESSION",
      payload: true,
    };
  }

  //Clear localStorage if the refresh expiry has been reached
  if (Date.now() > parseInt(localStorage.getItem("refreshExpiry") as string)) {
    localStorage.clear();
    return {
      type: "UPDATE_SESSION",
      payload: false,
    };
  }

  //Refresh token if session has expired
  if (Date.now() > parseInt(localStorage.getItem("accessExpiry") as string)) {
    return async (dispatch: (action: Action<boolean>) => void) => {
      const response: AxiosResponse<Response<Session>> = await axios.patch(
        `https://covidvault.com.au/api/session/${localStorage.getItem("sessionID")}`,
        {
          refreshToken: localStorage.getItem("refreshToken"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const { data } = response.data;
        localStorage.setItem("accountID", data.accountID);
        localStorage.setItem("sessionID", data.sessionID);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("accessExpiry", (Date.now() + data.accessExpiry * 1000).toString());
        localStorage.setItem("refreshExpiry", (Date.now() + data.refreshExpiry * 1000).toString());
        dispatch({ type: "UPDATE_SESSION", payload: true });
      } else {
        localStorage.clear();
        dispatch({ type: "UPDATE_SESSION", payload: false });
      }
    };
  }
  return { type: "UPDATE_SESSION", payload: false };
};
