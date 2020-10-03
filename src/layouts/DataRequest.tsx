import React, { Component } from "react";
import { connect } from "react-redux";
import { ComingSoon, Header, Sidebar } from "../components";

import { checkSession } from "../actions";
import { Action } from "../interfaces";

class DataRequest extends Component<DataRequestProps, DataRequestState> {
  render = () => {
    return (
      <>
        <Header />
        <Sidebar />
        <ComingSoon title="Data Extraction Request" />
      </>
    );
  };
}

const mapStateToProps = (state: DataRequestStateTransfer) => {
  const { loggedIn } = state;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, { checkSession })(DataRequest);

interface DataRequestProps {
  checkSession: () => Action<boolean>;
  loggedIn: boolean;
}
interface DataRequestState {}
interface DataRequestStateTransfer {
  loggedIn: boolean;
}
