import "./ComingSoon.css";

import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Statics as _C } from "../classes";

class ComingSoon extends Component<ComingSoonProps, ComingSoonState> {
  render = () => {
    const {showDrawer, title} = this.props;
    const gridStyle = _C.GridWidth(showDrawer);
    return (
      <>
        <Grid style={gridStyle} spacing={4} container>
          <Grid item xs={12}>
            <Paper elevation={3} className="cs_paper">
              <h1>{title}</h1>
              <p>Coming Soon</p>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state:ComingSoonStateTransfer) => {
  const { showDrawer } = state;
  return {
    showDrawer
  }
}

export default connect(mapStateToProps, {})(ComingSoon)

interface ComingSoonProps {
  showDrawer:boolean;
  title: string;
}
interface ComingSoonState {}
interface ComingSoonStateTransfer {
  showDrawer:boolean;
}