import React, { Component } from "react";
import { connect } from "react-redux";
import { ComingSoon, Header, Sidebar } from "../components";

import { checkSession } from "../actions";
import { Action } from "../interfaces";

class ConditionsOfEntry extends Component<ConditionsOfEntryProps, ConditionsOfEntryState> {
  render = () => {
    return (
      <>
        <Header />
        <Sidebar />
        <ComingSoon title="Conditions of Entry" />
      </>
    );
  };
}

const mapStateToProps = (state: ConditionsOfEntryStateTransfer) => {
  const { loggedIn } = state;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, { checkSession })(ConditionsOfEntry);

interface ConditionsOfEntryProps {
  checkSession: () => Action<boolean>;
  loggedIn: boolean;
}
interface ConditionsOfEntryState {}
interface ConditionsOfEntryStateTransfer {
  loggedIn: boolean;
}
