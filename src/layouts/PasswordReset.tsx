import logo from "../assets/images/logo.svg";

import React, { Component } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";

import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { navigate } from "../actions";
import { AttributionBox } from "../components";
import { api } from "../consts";
import { Pages } from "../enums";
import { Action, InputState, Response } from "../interfaces";

class PasswordReset extends Component<PasswordResetProps, PasswordResetState> {
  constructor(props: PasswordResetProps) {
    super(props);
    this.state = {
      display: "loading",
      password: {
        label: "Password",
        value: "",
        error: false,
      },
      passwordConf: {
        label: "Repeat password",
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

  private _formSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { id, a, c, navigate } = this.props;
    const { password, passwordConf } = this.state;
    if (password.value !== passwordConf.value || password.value.length === 0)
      this.setState({
        message: {
          show: true,
          value: "Passwords do not match. Please try again.",
          severity: "error",
        },
      });
    try {
      const response: AxiosResponse<Response<undefined>> = await api.patch(`/activator/${id}`, {
        accountID: a,
        code: c,
        password: password.value,
      });
      if (response.data.success) {
        this.setState({
          message: {
            show: true,
            value: "Password reset completed. Redirecting to login.",
            severity: "success",
          },
        });
        window.setTimeout(() => navigate(Pages.login), 2500);
      }
    } catch (e) {
      this.setState({
        message: {
          show: true,
          value: "Password reset unsuccessful. Please try again.",
          severity: "error",
        },
      });
    }
  };

  private _formUpdate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const { password, passwordConf } = this.state;
    if (name === "password")
      this.setState({
        password: {
          ...password,
          value,
        },
      });
    else if (value !== password.value)
      this.setState({
        passwordConf: {
          ...passwordConf,
          error: true,
          value,
        },
      });
    else
      this.setState({
        passwordConf: {
          ...passwordConf,
          error: false,
          value,
        },
      });
    e.preventDefault();
  };

  private _navigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, page: Pages): void => {
    const { navigate } = this.props;
    navigate(page);
    e.preventDefault();
  };

  componentDidMount = async (): Promise<void> => {
    const { id, a, c, navigate } = this.props;
    const getResponse: AxiosResponse<Response<{ valid: boolean; accountActive: boolean }>> = await api.get(
      `/activator/${id}?a=${a}&c=${c}`
    );
    if (getResponse.data.success) {
      const { data } = getResponse.data;
      if (data.valid && !data.accountActive) {
        this.setState({
          display: "activate",
        });
        const patchResponse: AxiosResponse<Response<undefined>> = await api.patch(`/activator/${id}`, {
          accountID: a,
          code: c,
        });
        if (patchResponse.data.success) {
          this.setState({
            message: {
              show: true,
              value: "Account activation successful. Redirecting to login.",
              severity: "success",
            },
          });
          window.setTimeout(() => navigate(Pages.login), 3000);
        }
      } else
        this.setState({
          display: "password",
        });
    }
  };

  render = () => {
    const { display, password, passwordConf, message } = this.state;
    const heading = display === "activate" ? "Account activation" : display === "loading" ? "Loading" : "Reset Password";
    const bodyContent =
      display === "password" ? (
        <form onSubmit={this._formSubmit}>
          <TextField
            name="password"
            label={password.label}
            className="input"
            type="password"
            value={password.value}
            onChange={this._formUpdate}
            error={password.error}
            required
            fullWidth
          />
          <TextField
            name="passwordConf"
            label={passwordConf.label}
            className="input"
            type="password"
            value={passwordConf.value}
            onChange={this._formUpdate}
            error={passwordConf.error}
            required
            fullWidth
          />
          <Box className="buttonContainer">
            <Button variant="contained" color="primary" type="submit">
              Update Password
            </Button>
          </Box>
          <Box className="linkContainer">
            <Link href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this._navigate(e, Pages.register)}>
              Register
            </Link>
            <Link href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this._navigate(e, Pages.login)}>
              Login
            </Link>
          </Box>
        </form>
      ) : (
        <p>Loading...</p>
      );
    return (
      <>
        <Container className="Login" maxWidth="sm">
          <Box className="flexContainer">
            <Box className="formContainer">
              <Box className="logoContainer">
                <img src={logo} alt="CovidVault logo" />
              </Box>
              <h1>{heading}</h1>
              {bodyContent}
              <AttributionBox />
            </Box>
          </Box>
          <Snackbar open={message.show} autoHideDuration={5000} onClose={this._closeSnackbar}>
            <Alert className={message.severity} severity={message.severity}>
              {message.value}
            </Alert>
          </Snackbar>
        </Container>
      </>
    );
  };
}

const mapStateToProps = (state: PasswordResetStateTransfer) => {
  return {};
};

export default connect(mapStateToProps, { navigate })(PasswordReset);

interface PasswordResetProps {
  navigate: (page: Pages) => Action<Pages>;
  id: string;
  a: string;
  c: string;
}
interface PasswordResetState {
  display: "loading" | "activate" | "password";
  password: InputState;
  passwordConf: InputState;
  message: {
    value: string;
    show: boolean;
    severity: "error" | "info" | "success";
  };
}
interface PasswordResetStateTransfer {}
