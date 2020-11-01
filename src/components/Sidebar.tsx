import "./Sidebar.css";
import spinner from "../assets/images/spinner.svg";

import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";

import { fetchAccount, logOut, navigate, setDrawer, updateSession } from "../actions";
import { api } from "../consts";
import { Pages } from "../enums";
import { Account, Action } from "../interfaces";
import { AttributionBox } from ".";

import Announcement from "@material-ui/icons/Announcement";
import BarChart from "@material-ui/icons/BarChart";
import Beenhere from "@material-ui/icons/Beenhere";
import Create from "@material-ui/icons/Create";
import CropFree from '@material-ui/icons/CropFree';
import DoneAll from "@material-ui/icons/DoneAll";
import Drawer from "@material-ui/core/Drawer";
import ExitToApp from "@material-ui/icons/ExitToApp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import ViewList from "@material-ui/icons/ViewList";

class Sidebar extends Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      open: true,
    };
  }

  componentDidMount = () => {
    const { account, fetchAccount } = this.props;
    if (account.id === "") fetchAccount();
  };

  private _handleDrawerClose = () => {
    this.props.setDrawer(false);
  };

  private _logOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { logOut } = this.props;
    api.delete(`/session/${localStorage.getItem("sessionID")}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    localStorage.clear();
    logOut();
    e.preventDefault();
  };

  private _navigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, page: Pages): void => {
    const { navigate } = this.props;
    navigate(page);
    e.preventDefault();
  };

  render = (): ReactNode => {
    const { account, loggedIn, pageDisplay, showDrawer } = this.props;
    const logo = account.logo ? (
      <img src={`https://www.covidvault.com.au/api/controller/render.php?id=${account.id}&type=account`} alt="account logo" />
    ) : null;
    const header =
      loggedIn && account.id ? (
        <>
          <>{logo}</>
          <h2>{account.name}</h2>
        </>
      ) : (
        <img src={spinner} alt="Loading" />
      );
    return (
      <>
        <Drawer className="Sidebar" variant="persistent" anchor="left" open={showDrawer} onClose={this._handleDrawerClose}>
          {header}
          <List aria-label="Sidebar dashboard navigation" className="nav-panel">
            {/* ACCOUNT */}
            <ListItem
              button
              selected={pageDisplay === Pages.account}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => this._navigate(e, Pages.account)}
            >
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText>Account Details</ListItemText>
            </ListItem>

            {/* CONDITIONS OF ENTRY */}
            <ListItem
              button
              selected={pageDisplay === Pages.entryConditions}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => this._navigate(e, Pages.entryConditions)}
            >
              <ListItemIcon>
                <DoneAll />
              </ListItemIcon>
              <ListItemText>Conditions of Entry</ListItemText>
            </ListItem>

            {/* PROMOTIONAL LINK */}
            <ListItem
              button
              selected={pageDisplay === Pages.followThru}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => this._navigate(e, Pages.followThru)}
            >
              <ListItemIcon>
                <Announcement />
              </ListItemIcon>
              <ListItemText>Promotional Link</ListItemText>
            </ListItem>

            {/* ANALYTICS */}
            <ListItem
              button
              selected={pageDisplay === Pages.analytics}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => this._navigate(e, Pages.analytics)}
            >
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText>Analytics</ListItemText>
            </ListItem>

            {/* MANUAL DATA ENTRY */}
            <ListItem
              button
              selected={pageDisplay === Pages.manualEntry}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => this._navigate(e, Pages.manualEntry)}
            >
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText>Manual Data Entry</ListItemText>
            </ListItem>

            {/* DATA REQUEST */}
            <ListItem
              button
              selected={pageDisplay === Pages.dataRequest}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => this._navigate(e, Pages.dataRequest)}
            >
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText>Data Request</ListItemText>
            </ListItem>

            {/* QR Code */}
            <ListItem button selected={false} component="a" href={`https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=M&chl=https://www.covidvault.com.au/checkin/?id=${account.id}`}>
              <ListItemIcon>
                <CropFree />
              </ListItemIcon>
              <ListItemText>QR Code</ListItemText>
            </ListItem>

            {/* CHECK-IN PAGE */}
            <ListItem button selected={false} component="a" href={`https://www.covidvault.com.au/checkin/?id=${account.id}`}>
              <ListItemIcon>
                <Beenhere />
              </ListItemIcon>
              <ListItemText>Check-in Page</ListItemText>
            </ListItem>

            {/* LOG OUT */}
            <ListItem button selected={false} onClick={this._logOut}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>Log Out</ListItemText>
            </ListItem>
          </List>
          <AttributionBox className="attrBox" />
        </Drawer>
      </>
    );
  };
}

const mapStateToProps = (state: SidebarStateTransfer) => {
  const { account, loggedIn, pageDisplay, showDrawer } = state;
  return {
    account,
    loggedIn,
    pageDisplay,
    showDrawer,
  };
};

export default connect(mapStateToProps, { fetchAccount, logOut, navigate, setDrawer, updateSession })(Sidebar);

interface SidebarProps {
  fetchAccount: () => (dispatch: (action: Action<Account> | Action<boolean>) => void) => Promise<void>;
  logOut: () => Action<undefined>;
  navigate: (page: Pages) => Action<Pages>;
  setDrawer: (open: boolean) => Action<boolean>;
  updateSession: (loggedIn: boolean) => Action<boolean>;
  account: Account;
  loggedIn: boolean;
  pageDisplay: Pages;
  showDrawer: boolean;
}
interface SidebarState {
  open: boolean;
}
interface SidebarStateTransfer {
  account: Account;
  loggedIn: boolean;
  pageDisplay: Pages;
  showDrawer: boolean;
}
