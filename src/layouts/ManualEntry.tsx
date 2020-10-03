import React, { Component } from "react";
import { connect } from "react-redux";
import { ComingSoon, Header, Sidebar } from "../components";

import { checkSession } from "../actions";
import { Action } from "../interfaces";

class ManualEntry extends Component<ManualEntryProps, ManualEntryState> {
  render = () => {
    return (
      <>
        <Header />
        <Sidebar />
        <ComingSoon title="Manual Data Entry" />
      </>
    );
  };
}

const mapStateToProps = (state: ManualEntryStateTransfer) => {
  const { loggedIn } = state;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, { checkSession })(ManualEntry);

interface ManualEntryProps {
  checkSession: () => Action<boolean>;
  loggedIn: boolean;
}
interface ManualEntryState {}
interface ManualEntryStateTransfer {
  loggedIn: boolean;
}
