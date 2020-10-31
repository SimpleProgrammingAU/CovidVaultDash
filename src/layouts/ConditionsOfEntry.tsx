import "./ConditionsOfEntry.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";

import { addCheckItem, fetchChecklist } from "../actions";
import { ConditionsOfEntryRow, Header, Sidebar } from "../components";
import { api } from "../consts";
import { Action, ChecklistItem, InputState, Response } from "../interfaces";

class ConditionsOfEntry extends Component<ConditionsOfEntryProps, ConditionsOfEntryState> {
  constructor(props: ConditionsOfEntryProps) {
    super(props);
    this.state = {
      newItem: {
        label: "Add new checklist item",
        value: "",
        error: false,
      },
      message: {
        value: "",
        show: false,
        severity: "success",
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

  private _formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { newItem } = this.state;
    const { value } = e.target;
    this.setState({
      newItem: {
        ...newItem,
        value: value,
      },
    });
    e.preventDefault();
  };

  private _formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { addCheckItem, account } = this.props;
    const { newItem } = this.state;
    api
      .post(
        `/checklist/${account.id}`,
        {
          text: newItem.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response: AxiosResponse<Response<{ id: string }>>) => {
        if (response.data.success) {
          addCheckItem({ id: response.data.data.id, statement: newItem.value });
          this.setState({
            newItem: {
              ...newItem,
              value: "",
              error: false,
            },
            message: {
              value: "Checklist item successfully added",
              show: true,
              severity: "success",
            },
          });
        }
      });
    e.preventDefault();
  };

  componentDidMount = () => {
    const { fetchChecklist } = this.props;
    fetchChecklist();
  };

  render = () => {
    const { checklist, showDrawer } = this.props;
    const { message, newItem } = this.state;
    const conditionList = checklist.map((item) => <ConditionsOfEntryRow id={item.id} text={item.statement} key={item.id} />);
    return (
      <>
        <Header />
        <Sidebar />
        <Grid className={(showDrawer ? "ConditionsOfEntry drawerOpen" : "ConditionsOfEntry drawerClosed")} spacing={4} container>
          <Grid item md={12}>
            <Paper className="paper" elevation={3} square>
              <h2>Conditions of Entry</h2>
              {conditionList}
              <form onSubmit={this._formSubmit}>
                <TextField
                  required
                  fullWidth
                  name="newItem"
                  label={newItem.label}
                  value={newItem.value}
                  error={newItem.error}
                  onChange={this._formChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Add Checklist Item
                </Button>
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

const mapStateToProps = (state: ConditionsOfEntryStateTransfer) => {
  const { account, checklist, showDrawer } = state;
  return {
    account,
    checklist,
    showDrawer,
  };
};

export default connect(mapStateToProps, { fetchChecklist, addCheckItem })(ConditionsOfEntry);

interface ConditionsOfEntryProps {
  addCheckItem: (payload: ChecklistItem) => Action<ChecklistItem>;
  fetchChecklist: () => (dispatch: (action: Action<ChecklistItem> | Action<undefined>) => void) => Promise<void>;
  account: Account;
  checklist: ChecklistItem[];
  showDrawer: boolean;
}
interface ConditionsOfEntryState {
  newItem: InputState;
  message: {
    value: string;
    show: boolean;
    severity: "success" | "error" | "info" | "warning";
  };
}
interface ConditionsOfEntryStateTransfer {
  account: Account;
  checklist: ChecklistItem[];
  showDrawer: boolean;
}
