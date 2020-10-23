import "./FollowThru.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";

import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";

import { addFollowThru, clearSnackbar, fetchFollowThru } from "../actions";
import { FollowThruRow, Header, Sidebar } from "../components";
import { Statics as _C } from "../classes";
import { api } from "../consts";
import { Action, AxiosError, FollowThru as IFollowThru, InputState, Response } from "../interfaces";

class FollowThru extends Component<FollowThruProps, FollowThruState> {
  constructor(props: FollowThruProps) {
    super(props);
    this.state = {
      newText: {
        label: "Promotional link heading text",
        value: "",
        error: false,
      },
      newImg: {
        name: "",
        label: "Promotional image",
        error: false,
        file: undefined,
        data: "",
      },
      newURL: {
        label: "Link to URL",
        value: "",
        error: false,
      },
      newStart: {
        label: "Valid from",
        value: "",
        error: false,
      },
      newExpiry: {
        label: "Valid to",
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

  private _addFollowThru = (e: React.FormEvent<HTMLFormElement>) => {
    const { newText, newImg, newURL, newStart, newExpiry, message } = this.state;
    const { addFollowThru } = this.props;
    if (!(newText.error || newImg.error || newURL.error || newStart.error || newExpiry.error)) {
      const formData = new FormData();
      formData.append("text", newText.value);
      formData.append("url", newURL.value);
      if (newImg.data.length > 0) formData.append("imgFile", newImg.file, newImg.name);
      if (newStart.value !== "") formData.append("start", newStart.value);
      if (newExpiry.value !== "") formData.append("expiry", newExpiry.value);
      api
        .post(`/followon/${localStorage.getItem("accountID")}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response: AxiosResponse<Response<IFollowThru>>) => {
          if (response.data.success) {
            addFollowThru(response.data.data);
            this.setState({
              message: {
                ...message,
                value: "Promotional link successfully added.",
                show: true,
                severity: "success",
              },
            });
          } else {
            this.setState({
              message: {
                ...message,
                value: response.data.messages[0],
                show: true,
                severity: "error",
              },
            });
          }
        })
        .catch((err: AxiosError<undefined>) => {
          if (err.isAxiosError && typeof err.response.data.messages !== "undefined")
            this.setState({ message: { value: err.response.data.messages[0], show: true, severity: "error" } });
          else console.error(err);
        });
    }
    e.preventDefault();
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

  private _dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { newStart, newExpiry } = this.state;
    const { name, value } = e.target;
    if (name === "newStart") {
      this.setState({
        newStart: {
          ...newStart,
          value,
        },
      });
    } else {
      this.setState({
        newExpiry: {
          ...newExpiry,
          value,
        },
      });
    }
    e.preventDefault();
  };

  private _formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //@ts-ignore
    this.setState({
      [name]: {
        //@ts-ignore
        ...this.state[name],
        value,
      },
    });
    e.preventDefault();
  };

  private _imgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { newImg } = this.state;
    if (e.target.files !== null) {
      if (["gif", "jpg", "jpeg", "png", "svg"].includes(e.target.files[0].name.replace(/(.+\.)/, "")))
        this.setState({
          newImg: {
            ...newImg,
            file: (e.target.files as FileList)[0],
            name: (e.target.files as FileList)[0].name,
            data: URL.createObjectURL(e.target.files[0]),
            error: false,
          },
        });
      else
        this.setState({
          newImg: {
            ...newImg,
            file: (e.target.files as FileList)[0],
            name: (e.target.files as FileList)[0].name,
            data: "",
            error: true,
          },
        });
    }
    e.preventDefault();
  };

  componentDidMount = () => {
    const { fetchFollowThru } = this.props;
    fetchFollowThru();
  };

  componentDidUpdate = () => {
    const { clearSnackbar, snackbarMessage } = this.props;
    const { message } = this.state;
    if (snackbarMessage.value.length > 0) {
      this.setState({
        message: {
          ...message,
          value: snackbarMessage.value,
          severity: snackbarMessage.severity,
          show: true,
        },
      });
      clearSnackbar();
    }
  };

  render = () => {
    const { followThru, showDrawer } = this.props;
    const { newText, newImg, newURL, newStart, newExpiry, message } = this.state;
    const linkList =
      followThru.length > 0 ? (
        followThru.map((item) => {
          return (
            <FollowThruRow
              id={item.id}
              key={item.id}
              text={item.text}
              href={item.url}
              start={item.start}
              expiry={item.expiry}
            />
          );
        })
      ) : (
        <p>No promotional links have been added.</p>
      );
    const gridStyle = _C.GridWidth(showDrawer);
    return (
      <>
        <Header />
        <Sidebar />
        <Grid style={gridStyle} spacing={4} container>
          <Grid item md={8}>
            <Paper className="paper" elevation={3}>
              <h2>Add New Link</h2>
              <form onSubmit={this._addFollowThru}>
                <Box className="row">
                  <TextField
                    required
                    name="newText"
                    label={newText.label}
                    className="input"
                    value={newText.value}
                    error={newText.error}
                    onChange={this._formChange}
                  />
                  <TextField
                    required
                    name="newURL"
                    label={newURL.label}
                    className="input"
                    value={newURL.value}
                    error={newURL.error}
                    onChange={this._formChange}
                  />
                </Box>
                <Box className="row">
                  <TextField
                    name="filename"
                    label="Selected logo file"
                    className="input"
                    value={newImg.name}
                    error={newImg.error}
                    disabled
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => document.getElementById("img")?.click()}
                  >
                    Select File
                  </Button>
                </Box>
                <Box className="row datePickerRow">
                  <TextField
                    margin="normal"
                    name="start"
                    type="date"
                    label={newStart.label}
                    value={newStart.value}
                    onChange={this._dateChange}
                  />
                  <TextField
                    margin="normal"
                    name="expiry"
                    type="date"
                    label={newExpiry.label}
                    value={newExpiry.value}
                    onChange={this._dateChange}
                  />
                </Box>
                <Box>
                  <Button variant="contained" color="primary" type="submit">
                    Add Link
                  </Button>
                </Box>
                <input type="file" name="img" id="img" onChange={this._imgChange} />
              </form>
            </Paper>
          </Grid>
          <Grid item md={4}>
            <Paper className="paper" elevation={3}>
              <h2>Preview</h2>
              <p>Coming in a future update.</p>
            </Paper>
          </Grid>
          <Grid item md={8}>
            <Paper className="paper" elevation={3}>
              <h2>Promotional Links</h2>
              {linkList}
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

const mapStateToProps = (state: FollowThruStateTransfer) => {
  const { followThru, showDrawer, snackbarMessage } = state;
  return {
    followThru,
    showDrawer,
    snackbarMessage,
  };
};

export default connect(mapStateToProps, { addFollowThru, clearSnackbar, fetchFollowThru })(FollowThru);

interface FollowThruProps {
  addFollowThru: (payload: IFollowThru) => Action<IFollowThru>;
  clearSnackbar: () => Action<undefined>;
  fetchFollowThru: () => (dispatch: (action: Action<IFollowThru>) => void) => Promise<void>;
  followThru: IFollowThru[];
  showDrawer: boolean;
  snackbarMessage: { value: string; severity: "success" | "info" | "warning" | "error" };
}
interface FollowThruState {
  newText: InputState;
  newImg: {
    file: any;
    name: string;
    label: string;
    error: boolean;
    data: string;
  };
  newURL: InputState;
  newStart: InputState;
  newExpiry: InputState;
  message: {
    value: string;
    show: boolean;
    severity: "success" | "info" | "warning" | "error";
  };
}
interface FollowThruStateTransfer {
  followThru: IFollowThru[];
  showDrawer: boolean;
  snackbarMessage: { value: string; severity: "success" | "info" | "warning" | "error" };
}
