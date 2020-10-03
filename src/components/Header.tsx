import "./Header.css";

import React, { Component } from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { toggleDrawer } from "../actions";
import { Action } from "../interfaces";

class Header extends Component<HeaderProps, HeaderState> {
  render = () => {
    const { toggleDrawer } = this.props;
    return (
      <AppBar className="Header" position="static">
        <Toolbar>
          <IconButton edge="start" onClick={toggleDrawer} aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h2">CovidVault Dashboard</Typography>
        </Toolbar>
      </AppBar>
    );
  };
}

const mapStateToProps = (state: HeaderStateTransfer) => {
  return {};
};

export default connect(mapStateToProps, { toggleDrawer })(Header);

interface HeaderProps {
  toggleDrawer: () => Action<undefined>;
}
interface HeaderState {}
interface HeaderStateTransfer {}
