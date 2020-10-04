import { combineReducers } from "redux";

import { account } from "./account";
import { checklist } from "./checklist";
import { followThru } from "./followThru";
import { loggedIn } from "./loggedIn";
import { pageDisplay } from "./pageDisplay";
import { showDrawer } from "./showDrawer";
import { snackbarMessage } from "./snackbarMessage";

export default combineReducers({
  account,
  checklist,
  followThru,
  loggedIn,
  pageDisplay,
  showDrawer,
  snackbarMessage,
});
