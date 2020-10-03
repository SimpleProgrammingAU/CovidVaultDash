import { combineReducers } from "redux";

import { account } from "./account";
import { followThru } from "./followThru";
import { loggedIn } from "./loggedIn";
import { pageDisplay } from "./pageDisplay";
import { showDrawer } from "./showDrawer";
import { snackbarMessage } from "./snackbarMessage";

export default combineReducers({
  account,
  followThru,
  loggedIn,
  pageDisplay,
  showDrawer,
  snackbarMessage,
});
