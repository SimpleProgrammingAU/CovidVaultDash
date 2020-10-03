import React, { Component } from "react";
import { connect } from "react-redux";
import { ComingSoon, Header, Sidebar } from "../components";

import { checkSession } from "../actions";
import { Action } from "../interfaces";

class ForgotPassword extends Component<ForgotPasswordProps, ForgotPasswordState> {
  render = () => {
    return (
      <>
        <Header />
        <Sidebar />
        <ComingSoon title="Password Recovery" />
      </>
    );
  };
}

const mapStateToProps = (state: ForgotPasswordStateTransfer) => {
  const { loggedIn } = state;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, { checkSession })(ForgotPassword);

interface ForgotPasswordProps {
  checkSession: () => Action<boolean>;
  loggedIn: boolean;
}
interface ForgotPasswordState {}
interface ForgotPasswordStateTransfer {
  loggedIn: boolean;
}
