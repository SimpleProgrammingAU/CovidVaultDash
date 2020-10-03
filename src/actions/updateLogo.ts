// import axios, { AxiosResponse } from "axios";
// import { AnyAction } from "redux";
// import { ThunkAction } from "redux-thunk";
import { Action } from "../interfaces";
//import { Response } from "../interfaces/";

export const updateLogo = (status: boolean):Action<boolean> => ({ type: "UPDATE_BUSINESS_LOGO", payload: status})

// export const updateLogo = (dataURL: string): ThunkAction<Promise<void>, { account: Account }, {}, AnyAction> => async (
//   dispatch,
//   getState
// ) => {
//   await dispatch(sendLogo(dataURL));
//   if (getState().account.logo)
//     dispatch({ type: "UPDATE_SNACKBAR", payload: { value: "Logo successfully updated.", severity: "success" } });
//   else dispatch({ type: "UPDATE_SNACKBAR", payload: { value: "Logo update failed.", severity: "error" } });
// };

// const sendLogo = (dataURL: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
//   return async (dispatch: (action: Action<string> | Action<boolean>) => void) => {
//     const response: AxiosResponse<Response<Account>> = await axios.patch(
//       `https://covidvault.com.au/api/account/${localStorage.getItem("accountID")}`,
//       {
//         logo: dataURL,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: localStorage.getItem("accessToken"),
//         },
//       }
//     );
//     if (response.data.success) {
//       dispatch({ type: "UPDATE_BUSINESS_LOGO", payload: dataURL } as Action<string>);
//     } else {
//       localStorage.clear();
//       dispatch({ type: "UPDATE_SESSION", payload: false } as Action<boolean>);
//     }
//   };
// };
