import "./ManualEntry.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";

import AddIcon from "@material-ui/icons/AddCircle";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import TickIcon from "@material-ui/icons/Check";

import { checkSession } from "../actions";
import { Header, Sidebar } from "../components";
import { api } from "../consts";
import { Action, Message, Response } from "../interfaces";

class ManualEntry extends Component<ManualEntryProps, ManualEntryState> {
  constructor(props: ManualEntryProps) {
    super(props);
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      visitors: [{ name: "", phone: "", error: false, complete: false }],
      message: {
        value: "",
        show: false,
        severity: "success",
      },
    };
  }

  private _addRow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { visitors } = this.state;
    e.preventDefault();
    this.setState({ visitors: [...visitors, { name: "", phone: "", error: false, complete: false }] });
  };

  private _closeSnackbar = (): void => {
    this.setState({
      message: {
        value: "",
        show: false,
        severity: "success",
      },
    });
  };

  private _formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { date, message, visitors } = this.state;
    visitors.forEach((visitor, i, arr) => {
      api
        .post(`/entry/${localStorage.getItem("accountID")}`, {
          name: visitor.name,
          phone: visitor.phone,
          arr: date + " 00:00:00",
        })
        .then((response: AxiosResponse<Response<{ id: number }>>) => {
          if (response.data.success) {
            arr[i].complete = true;
            this.setState({ visitors: arr });
          } else
            this.setState({
              message: {
                ...message,
                value: response.data.messages[0],
                show: true,
                severity: "error",
              },
            });
        })
        .catch(() => {
          this.setState({
            message: {
              ...message,
              value: "Adding entry failed. Check form for unsubmitted rows.",
              show: true,
              severity: "error",
            },
          });
        });
    });
  };

  private _removeRow = (i: number) => {
    const { visitors } = this.state;
    this.setState({ visitors: visitors.filter((row, idx) => idx !== i) });
  };

  private _updateDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ date: e.target.value });
  };

  private _updateName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { visitors } = this.state;
    const id = parseInt(e.target.name.split("-")[1]);
    visitors[id].name = e.target.value;
    this.setState({ visitors: [...visitors] });
  };

  private _updatePhone = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();
    const { visitors } = this.state;
    let { value, name } = e.target;
    const id = parseInt(name.split("-")[1]);
    if (value.length < 3) value = "+61";
    value = value.replace(/[^0-9|+]/, "");
    if (value.length > 12) value = value.substr(0, 12);
    visitors[id].phone = value;
    this.setState({ visitors: [...visitors] });
  };

  render = () => {
    const { showDrawer } = this.props;
    const { date, message, visitors } = this.state;
    const entryRows = visitors.map((row, i) => {
      const icon = row.complete ? <TickIcon /> : <DeleteIcon />;
      return (
        <FormGroup key={i} row>
          <TextField
            id={`name-${i}`}
            name={`name-${i}`}
            key={`name-${i}`}
            className="field name"
            label="Name"
            value={row.name}
            error={row.error}
            onChange={this._updateName}
          />
          <TextField
            id={`phone-${i}`}
            name={`phone-${i}`}
            key={`phone-${i}`}
            className="field phone"
            label="Phone number"
            onChange={this._updatePhone}
            onFocus={this._updatePhone}
            value={row.phone}
            error={row.error}
          />
          <IconButton aria-label="remove" onClick={() => this._removeRow(i)}>
            {icon}
          </IconButton>
        </FormGroup>
      );
    });
    return (
      <>
        <Header />
        <Sidebar />
        <Grid className={(showDrawer ? "ManualEntry drawerOpen" : "ManualEntry drawerClosed")} justify={"center"} spacing={4} container>
          <Grid item lg={4} md={12}>
            <Paper elevation={3} className="paper" square>
              <h2>Manual Data Entry</h2>
              <p>
                Maybe you just registered your account and need to transfer your previous visitor logs; or occasionally, things
                just don't go to plan:
              </p>
              <ul>
                <li>the internet stops working</li>
                <li>visitor doesn't have a smartphone</li>
                <li>visitor refuses to check-in digitally or</li>
                <li>our server is down temporarily</li>
              </ul>
              <p>In times like these, use this form to add visitor check-in stats so that you can throw that paper away.</p>
              <p>Make sure to correctly set the date before submitting!</p>
            </Paper>
          </Grid>
          <Grid item lg={8} md={12}>
            <Paper elevation={3} className="paper" square>
              <h2>&nbsp;</h2>
              <form onSubmit={this._formSubmit}>
                <TextField
                  type="date"
                  label="Date"
                  value={date}
                  InputLabelProps={{ shrink: true }}
                  onChange={this._updateDate}
                />
                {entryRows}
                <FormGroup row>
                  <Button variant="contained" color="primary" className="btn add" endIcon={<AddIcon />} onClick={this._addRow}>
                    Add Row
                  </Button>
                  <Button variant="contained" color="primary" className="btn send" endIcon={<SendIcon />} type="submit">
                    Submit
                  </Button>
                </FormGroup>
              </form>
            </Paper>
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

const mapStateToProps = (state: ManualEntryStateTransfer) => {
  const { loggedIn, showDrawer } = state;
  return {
    loggedIn,
    showDrawer,
  };
};

export default connect(mapStateToProps, { checkSession })(ManualEntry);

interface ManualEntryProps {
  checkSession: () => Action<boolean>;
  loggedIn: boolean;
  showDrawer: boolean;
}
interface ManualEntryState {
  date: string;
  visitors: {
    name: string;
    phone: string;
    error: boolean;
    complete: boolean;
  }[];
  message: Message;
}
interface ManualEntryStateTransfer {
  loggedIn: boolean;
  showDrawer: boolean;
}
