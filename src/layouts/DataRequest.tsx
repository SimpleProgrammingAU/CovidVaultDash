import "./DataRequest.css";

import React, { Component } from "react";
import { connect } from "react-redux";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";

import { Header, Sidebar } from "../components";
import { api } from "../consts";
import { checkSession } from "../actions";
import { Action, InputState, Message, Response } from "../interfaces";
import { AxiosResponse } from "axios";

class DataRequest extends Component<DataRequestProps, DataRequestState> {
  constructor(props: DataRequestProps) {
    super(props);
    this.state = {
      phone: {
        value: "",
        label: "Phone number",
        error: false,
      },
      authContact: {
        value: "",
        label: "Name",
        error: false,
      },
      password: {
        value: "",
        label: "Password",
        error: false,
      },
      date: {
        value: "",
        label: "Date",
        error: false,
      },
      message: {
        value: "",
        show: false,
        severity: "success",
      },
      phoneResponse: {
        ready: false,
        hasVisited: false,
        visitedOthers: false,
      },
    };
  }

  private _closeSnackbar = (): void => {
    this.setState({
      message: {
        value: "",
        show: false,
        severity: "success",
      },
    });
  };

  private _updateDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { date } = this.state;
    e.preventDefault();
    this.setState({
      date: {
        ...date,
        value: e.target.value,
      },
    });
  };

  private _updatePhone = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    const { phone } = this.state;
    let { value } = e.target;
    if (value.length < 3) value = "+61";
    value = value.replace(/[^0-9|+]/, "");
    if (value.length > 12) value = value.substr(0, 12);
    this.setState({ phone: { ...phone, value } });
  };

  private _updateName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { authContact } = this.state;
    const { value } = e.target;
    e.preventDefault();
    this.setState({ authContact: { ...authContact, value } });
  };

  private _updatePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { password } = this.state;
    const { value } = e.target;
    e.preventDefault();
    this.setState({ password: { ...password, value } });
  };

  private _dateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { date, authContact, password } = this.state;
    api
      .post(
        `/extract/${localStorage.accountID}/${date.value}`,
        {
          authName: authContact.value,
          password: password.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response: AxiosResponse<Response<undefined>>) => {
        if (response.data.success)
          this.setState({
            message: {
              value: "Data request sent successfully.",
              show: true,
              severity: "success",
            },
          });
        else
          this.setState({
            message: {
              value: response.data.messages[0],
              show: true,
              severity: "error",
            },
          });
      });
  };

  private _phoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { phone, authContact, password } = this.state;
    api
      .post(
        `/extract/${localStorage.accountID}/${phone.value}`,
        {
          authName: authContact.value,
          password: password.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response: AxiosResponse<Response<{ atLocation: boolean; atOtherLocation: boolean }>>) => {
        const { data } = response.data;
        if (response.data.success)
          this.setState({
            phoneResponse: {
              ready: true,
              hasVisited: Boolean(data.atLocation),
              visitedOthers: Boolean(data.atOtherLocation),
            },
          });
        else
          this.setState({
            message: {
              value: response.data.messages[0],
              show: true,
              severity: "error",
            },
          });
      });
  };

  render = () => {
    const { showDrawer } = this.props;
    const { phone, date, authContact, password, message, phoneResponse } = this.state;
    const phoneContent = phoneResponse.ready ? (
      <>
        <p>Results for {phone.value}:</p>
        <ul>
          <li>Visited your business in the last 28 days: {phoneResponse.hasVisited ? "yes" : "no"}</li>
          <li>Visited another CovidVault location in the last 28 days: {phoneResponse.visitedOthers ? "yes" : "no"}</li>
        </ul>
      </>
    ) : (
      <>
        <p>This request provides an immediate response. Searching by phone number will provide two metrics:</p>
        <ul>
          <li>whether or not the contact has visited your business in the last 28 days</li>
          <li>whether or not the contact has visited any other businesses registered with CovidVault.</li>
        </ul>
        <p>
          This information can be used to allow health authorities to ascertain other potential locations of spread that may not
          yet have been captured.
        </p>
        <form onSubmit={this._phoneSubmit}>
          <TextField type="text" fullWidth label={phone.label} value={phone.value} onChange={this._updatePhone} />
          <TextField
            type="text"
            fullWidth
            label={authContact.label}
            value={authContact.value}
            onChange={this._updateName}
            helperText="By entering your name here, you confirm that you are the authorised contact for this business"
          />
          <TextField type="password" fullWidth label={password.label} value={password.value} onChange={this._updatePassword} />
          <Button variant="contained" color="primary" type="submit">
            Submit Request
          </Button>
        </form>
      </>
    );
    return (
      <>
        <Header />
        <Sidebar />
        <Grid className={(showDrawer ? "DataRequest drawerOpen" : "DataRequest drawerClosed")} justify="center" spacing={4} container>
          <Grid item md={6}>
            <Paper elevation={3} square>
              <h2>Data Request</h2>
              <p>
                These forms permit the request for the contact data of visitors to your business. As per the CovidVault privacy
                policy, contact data will only be provided for the purposes of contact tracing at the request of the state
                health authorities. Additionally, the request can only be made by the "authorised contact" from your business.
                Any data request that does not meet these conditions is not permitted.
              </p>
              <p>In the event that you require contact data please ensure you complete the following steps:</p>
              <ol>
                <li>Receive request for data from state health authorities</li>
                <li>Issue your request through one or both of the forms on this page</li>
                <li>
                  Email <a href="mailto:hi@covidvault.com.au">hi@covidvault.com.au</a> with evidence of the request made by the
                  state health authorities
                </li>
                <li>Await response from CovidVault with request data</li>
                <li>Forward to appropriate authorities.</li>
              </ol>
              <p>
                Failure to supply sufficient evidence of the request from health authorities will result in a visitor advisory
                warning being added to your check-in screen.
              </p>
              <p>
                We will endeavour to provide the requested contact data within 60 minutes of the request. Should the matter be
                of heightened urgency or you believe the request has been delayed, please do not hesitate to call us on{" "}
                <a href="tel:+61390133909">+613 9013 3909</a>.
              </p>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Grid item md={12}>
              <Paper elevation={3} square>
                <h3>Request Data by Date</h3>
                <form onSubmit={this._dateSubmit}>
                  <TextField
                    type="date"
                    label="Date"
                    value={date.value}
                    InputLabelProps={{ shrink: true }}
                    onChange={this._updateDate}
                  />
                  <TextField
                    type="text"
                    fullWidth
                    label={authContact.label}
                    value={authContact.value}
                    onChange={this._updateName}
                    helperText="By entering your name here, you confirm that you are the authorised contact for this business"
                  />
                  <TextField
                    type="password"
                    fullWidth
                    label={password.label}
                    value={password.value}
                    onChange={this._updatePassword}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Submit Request
                  </Button>
                </form>
              </Paper>
            </Grid>
            <Grid item md={12}>
              <Paper elevation={3} square>
                <h3>Request Data by Phone Number</h3>
                {phoneContent}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar open={message.show} autoHideDuration={5000} onClose={this._closeSnackbar}>
          <Alert className={message.severity} severity={message.severity}>
            {message.value}
          </Alert>
        </Snackbar>
      </>
    );
  };
}

const mapStateToProps = (state: DataRequestStateTransfer) => {
  const { loggedIn, showDrawer } = state;
  return {
    loggedIn,
    showDrawer,
  };
};

export default connect(mapStateToProps, { checkSession })(DataRequest);

interface DataRequestProps {
  checkSession: () => Action<boolean>;
  loggedIn: boolean;
  showDrawer: boolean;
}
interface DataRequestState {
  phone: InputState;
  authContact: InputState;
  password: InputState;
  date: InputState;
  message: Message;
  phoneResponse: {
    ready: boolean;
    hasVisited: boolean;
    visitedOthers: boolean;
  };
}
interface DataRequestStateTransfer {
  loggedIn: boolean;
  showDrawer: boolean;
}
