import React, { Component } from "react";
import { connect } from "react-redux";
import { ComingSoon, Header, Sidebar } from "../components";

import { checkSession } from "../actions";
import { Action } from "../interfaces";

class Analytics extends Component<AnalyticsProps, AnalyticsState> {
  render = () => {
    return (
      <>
        <Header />
        <Sidebar />
        <ComingSoon title="Analytics" />
      </>
    );
  };
}

const mapStateToProps = (state: AnalyticsStateTransfer) => {
  const { loggedIn } = state;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, { checkSession })(Analytics);

interface AnalyticsProps {
  checkSession: () => Action<boolean>;
  loggedIn: boolean;
}
interface AnalyticsState {}
interface AnalyticsStateTransfer {
  loggedIn: boolean;
}
