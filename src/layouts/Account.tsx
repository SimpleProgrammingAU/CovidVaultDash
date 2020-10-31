import "./Account.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";
import { ThunkAction } from "redux-thunk";

import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import { clearSnackbar, deleteAccount, patchAccount, updateAccount, updateLogo } from "../actions";
import { Header, Sidebar } from "../components";
import { api } from "../consts";
import { Account as IAccount, Action, AxiosError, InputState, Response, Snackbar as ISnackbar } from "../interfaces";

class Account extends Component<AccountProps, AccountState> {
  constructor(props: AccountProps) {
    super(props);
    this.state = {
      password: {
        label: "Current password",
        value: "",
        error: false,
      },
      newPassword: {
        label: "New password",
        value: "",
        error: false,
      },
      newPasswordConfirm: {
        label: "Confirm new password",
        value: "",
        error: false,
      },
      businessName: {
        label: "Business name",
        value: "",
        error: false,
      },
      abn: {
        label: "ABN",
        value: "",
        error: false,
      },
      authContactName: {
        label: "Authorised contact",
        value: "",
        error: false,
      },
      authContactPhone: {
        label: "Contact phone number",
        value: "",
        error: false,
      },
      streetAddress: {
        label: "Street address",
        value: "",
        error: false,
      },
      suburb: {
        label: "Suburb / town",
        value: "",
        error: false,
      },
      state: {
        label: "State",
        value: "",
        error: false,
      },
      postcode: {
        label: "Postcode",
        value: "",
        error: false,
      },
      logo: {
        file: undefined,
        name: "",
        label: "Logo",
        error: false,
        data: "",
      },
      message: {
        value: "",
        show: false,
        severity: "success",
      },
      deleteDisabled: true,
    };
  }

  private _accountSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.props.patchAccount();
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

  private _formUpdate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { updateAccount } = this.props;
    const { name, value } = e.target;
    updateAccount(name, value);
  };

  private _localUpdate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
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

  private _logoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { logo } = this.state;
    if (e.target.files !== null) {
      if (["gif", "jpg", "jpeg", "png", "svg"].includes(e.target.files[0].name.replace(/(.+\.)/, "")))
        this.setState({
          logo: {
            ...logo,
            file: (e.target.files as FileList)[0],
            name: (e.target.files as FileList)[0].name,
            data: URL.createObjectURL(e.target.files[0]),
            error: false,
          },
        });
      else
        this.setState({
          logo: {
            ...logo,
            file: (e.target.files as FileList)[0],
            name: (e.target.files as FileList)[0].name,
            data: "",
            error: true,
          },
        });
    }
  };

  private _logoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { updateLogo } = this.props;
    const { logo } = this.state;
    const formData = new FormData();
    if (logo.data.length > 0) {
      formData.append("logo", logo.file, logo.name);
      api
        .post(`/account/${localStorage.getItem("accountID")}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((response: AxiosResponse<Response<undefined>>) => {
          if (response.data.success) updateLogo(true);
        });
    }
    e.preventDefault();
  };

  private _passwordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { password, newPassword, message } = this.state;
    if (this._passwordValidate()) {
      api
        .patch(
          `/account/${localStorage.getItem("accountID")}`,
          {
            password: password.value,
            newPassword: newPassword.value,
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
                ...message,
                value: "Password successfully updated",
                show: true,
                severity: "success",
              },
            });
          else
            this.setState({
              message: {
                ...message,
                value: response.data.messages[0],
                show: true,
                severity: "error",
              },
            });
        })
        .catch((response: AxiosError<Response<undefined>>) => {
          this.setState({
            message: {
              ...message,
              value: response.response.data.messages[0],
              show: true,
              severity: "error",
            },
          });
        });
    }
    e.preventDefault();
  };

  private _passwordValidate = (): boolean => {
    const { newPassword, newPasswordConfirm } = this.state;
    if (newPasswordConfirm.value.length > 0 && newPassword.value !== newPasswordConfirm.value) {
      this.setState({
        newPassword: {
          ...newPassword,
          error: true,
        },
        newPasswordConfirm: {
          ...newPasswordConfirm,
          error: true,
        },
      });
      return false;
    } else {
      this.setState({
        newPassword: {
          ...newPassword,
          error: false,
        },
        newPasswordConfirm: {
          ...newPasswordConfirm,
          error: false,
        },
      });
      return true;
    }
  };

  private _stateUpdate = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ): void => {
    const { updateAccount } = this.props;
    const { value } = e.target;
    updateAccount("state", value as string);
  };

  private _toggleDeleteButton = () => {
    const { deleteDisabled } = this.state;
    this.setState({
      deleteDisabled: !deleteDisabled,
    });
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
    const { account, deleteAccount, showDrawer } = this.props;
    const {
      password,
      newPassword,
      newPasswordConfirm,
      businessName,
      abn,
      authContactName,
      authContactPhone,
      streetAddress,
      suburb,
      state,
      postcode,
      logo,
      message,
      deleteDisabled,
    } = this.state;
    const logoPreview = logo.file ? <img className="logoPreview" src={logo.data} alt="Your business' logo" /> : null;
    return (
      <>
        <Header />
        <Sidebar />
        <Grid className={(showDrawer ? "Account drawerOpen" : "Account drawerClosed")} spacing={4} container>
          <Grid item lg={4} md={6}>
            <Paper className="paper" elevation={3}>
              <h2>Account Details</h2>
              <form onSubmit={this._accountSubmit}>
                <h3>Business Details</h3>
                <TextField
                  name="businessName"
                  label={businessName.label}
                  className="input"
                  value={account.name}
                  onChange={this._formUpdate}
                  error={businessName.error}
                  fullWidth
                />
                <TextField
                  name="abn"
                  label={abn.label}
                  className="input"
                  value={account.abn}
                  onChange={this._formUpdate}
                  error={abn.error}
                  fullWidth
                />
                <TextField
                  name="streetAddress"
                  label={streetAddress.label}
                  className="input"
                  value={account.streetAddress}
                  onChange={this._formUpdate}
                  error={streetAddress.error}
                  fullWidth
                />
                <TextField
                  name="suburb"
                  label={suburb.label}
                  className="input"
                  value={account.suburb}
                  onChange={this._formUpdate}
                  error={suburb.error}
                />
                <FormControl style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                  <InputLabel shrink id="state-input-label">
                    State
                  </InputLabel>
                  <Select labelId="state-input-label" value={account.state} onChange={this._stateUpdate} error={state.error}>
                    <MenuItem value={"ACT"}>ACT</MenuItem>
                    <MenuItem value={"NSW"}>NSW</MenuItem>
                    <MenuItem value={"NT"}>NT</MenuItem>
                    <MenuItem value={"QLD"}>QLD</MenuItem>
                    <MenuItem value={"SA"}>SA</MenuItem>
                    <MenuItem value={"TAS"}>TAS</MenuItem>
                    <MenuItem value={"VIC"}>VIC</MenuItem>
                    <MenuItem value={"WA"}>WA</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="postcode"
                  label={postcode.label}
                  className="input"
                  value={account.postcode}
                  onChange={this._formUpdate}
                  error={postcode.error}
                />
                <h3>Authorised Contact</h3>
                <TextField
                  name="authContact"
                  label={authContactName.label}
                  className="input"
                  value={account.authContact}
                  onChange={this._formUpdate}
                  error={authContactName.error}
                  fullWidth
                />
                <TextField
                  name="phone"
                  label={authContactPhone.label}
                  className="input"
                  value={account.phone}
                  onChange={this._formUpdate}
                  error={authContactPhone.error}
                  fullWidth
                />
                <Box className="buttonContainer">
                  <Button variant="contained" color="primary" type="submit">
                    Update Details
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
          <Grid item lg={4} md={6}>
            <Paper className="paper" elevation={3}>
              <h2>Update Logo</h2>
              {logoPreview}
              <form onSubmit={this._logoSubmit}>
                <TextField
                  name="filename"
                  label="Selected logo file"
                  className="input"
                  value={logo.name}
                  error={logo.error}
                  fullWidth
                  disabled
                />
                <Box className="buttonContainer">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => document.getElementById("logo")?.click()}
                  >
                    Select File
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Update Logo
                  </Button>
                </Box>
                <input type="file" name="logo" id="logo" onChange={this._logoChange} />
              </form>
            </Paper>
          </Grid>
          <Grid item lg={4} md={6}>
            <Paper className="paper" elevation={3}>
              <h2>Change Password</h2>
              <form onSubmit={this._passwordSubmit}>
                <TextField
                  name="password"
                  label={password.label}
                  className="input"
                  type="password"
                  value={password.value}
                  onChange={this._localUpdate}
                  error={password.error}
                  required
                  fullWidth
                />
                <TextField
                  name="newPassword"
                  label={newPassword.label}
                  className="input"
                  type="password"
                  value={newPassword.value}
                  onChange={this._localUpdate}
                  error={newPassword.error}
                  required
                  fullWidth
                />
                <TextField
                  name="newPasswordConfirm"
                  label={newPasswordConfirm.label}
                  className="input"
                  type="password"
                  value={newPasswordConfirm.value}
                  onChange={this._localUpdate}
                  onBlur={this._passwordValidate}
                  error={newPasswordConfirm.error}
                  required
                  fullWidth
                />
                <Box className="buttonContainer">
                  <Button variant="contained" color="primary" type="submit">
                    Update Password
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className="paper" elevation={3}>
              <h2>Delete Account</h2>
              <form onSubmit={() => deleteAccount(account.id)}>
                <FormControlLabel
                  control={<Switch onChange={this._toggleDeleteButton} />}
                  label="I confirm that deleting my account will clear all contacts previously registered from the database."
                  style={{ display: "block" }}
                />
                <Button variant="contained" color="secondary" type="submit" disabled={deleteDisabled}>
                  Delete Account
                </Button>
                <p>Warning: Once you delete your account, there is no going back. Please be certain.</p>
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

const mapStateToProps = (state: AccountStateTransfer) => {
  const { account, showDrawer, snackbarMessage } = state;
  return {
    account,
    showDrawer,
    snackbarMessage,
  };
};

export default connect(mapStateToProps, { clearSnackbar, deleteAccount, patchAccount, updateAccount, updateLogo })(Account);

interface AccountProps {
  clearSnackbar: () => Action<undefined>;
  deleteAccount: (id: string) => (dispatch: (action: Action<boolean> | Action<undefined>) => void) => Promise<void>;
  patchAccount: () => ThunkAction<
    Promise<void>,
    {
      account: IAccount;
    },
    {},
    Action<ISnackbar>
  >;
  updateAccount: (name: string, value: string) => Action<string>;
  updateLogo: (status: boolean) => Action<boolean>;
  account: IAccount;
  showDrawer: boolean;
  snackbarMessage: ISnackbar;
}
interface AccountState {
  password: InputState;
  newPassword: InputState;
  newPasswordConfirm: InputState;
  businessName: InputState;
  abn: InputState;
  authContactName: InputState;
  authContactPhone: InputState;
  streetAddress: InputState;
  suburb: InputState;
  state: InputState;
  postcode: InputState;
  logo: {
    file: any;
    name: string;
    label: string;
    error: boolean;
    data: string;
  };
  message: {
    value: string;
    show: boolean;
    severity: "success" | "info" | "warning" | "error";
  };
  deleteDisabled: boolean;
}
interface AccountStateTransfer {
  account: IAccount;
  showDrawer: boolean;
  snackbarMessage: ISnackbar;
}
