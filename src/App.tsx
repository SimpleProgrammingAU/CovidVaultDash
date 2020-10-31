import "./App.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import { Pages } from "./enums";
import {
  Account,
  Analytics,
  ConditionsOfEntry,
  DataRequest,
  FollowThru,
  ForgotPassword,
  Login,
  ManualEntry,
  PasswordReset,
  Register,
} from "./layouts";

class App extends Component<AppProps, AppState> {
  private _getPage = (): JSX.Element => {
    const { loggedIn, pageDisplay } = this.props;
    const query = queryString.parse(window.location.search);

    if (typeof query['id'] === "string" && typeof query["a"] === "string" && typeof query["c"] === "string") {
      return <PasswordReset id={query.id as string} a={query.a as string} c={query.c as string} />;
    }

    if (!loggedIn && ![Pages.login, Pages.register, Pages.forgotPassword].includes(pageDisplay)) return <Login />;
    switch (pageDisplay) {
      case Pages.login:
        return <Login />;
      case Pages.register:
        return <Register />;
      case Pages.account:
        return <Account />;
      case Pages.analytics:
        return <Analytics />;
      case Pages.entryConditions:
        return <ConditionsOfEntry />;
      case Pages.dataRequest:
        return <DataRequest />;
      case Pages.followThru:
        return <FollowThru />;
      case Pages.forgotPassword:
        return <ForgotPassword />;
      case Pages.manualEntry:
        return <ManualEntry />;
      default:
        return <Login />;
    }
  };

  render = () => {
    const page = this._getPage();
    return <>{page}</>;
  };
}

const mapStateToProps = (state: AppStateTransfer) => {
  const { loggedIn, pageDisplay } = state;
  return {
    loggedIn,
    pageDisplay,
  };
};

export default connect(mapStateToProps, {})(App);

interface AppProps {
  loggedIn: boolean;
  pageDisplay: Pages;
}
interface AppState {}
interface AppStateTransfer {
  loggedIn: boolean;
  pageDisplay: Pages;
}
