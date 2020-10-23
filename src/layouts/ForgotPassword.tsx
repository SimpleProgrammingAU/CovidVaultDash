import logo from "../assets/images/logo.svg";

import React, { Component } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";

import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";

import { navigate } from "../actions";
import { AttributionBox } from "../components";
import { api } from "../consts";
import { Pages } from "../enums";
import { Action, Activator, InputState, Response } from "../interfaces";

class ForgotPassword extends Component<ForgotPasswordProps, ForgotPasswordState> {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this.state = {
      email: {
        label: "Email address",
        value: "",
        error: false,
      },
      message: {
        show: false,
        severity: "success",
        value: "",
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

  private _formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email } = this.state;
    try {
      const activatorResponse: AxiosResponse<Response<Activator>> = await api.post(`/activator`, {
        email: email.value,
      });
      if (activatorResponse.data.success) {
        this.setState({
          message: {
            value: "Password reset successful. Please check your email.",
            severity: "success",
            show: true,
          },
        });
      }
    } catch (e) {
      this.setState({
        message: {
          value: "Password reset could not be completed. Please try again.",
          severity: "error",
          show: true,
        },
      });
    }
  };

  private _formUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { email } = this.state;
    const { value } = e.target;
    if (value.search(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i) === -1)
      this.setState({ email: { ...email, value, error: true } });
    else this.setState({ email: { ...email, value, error: false } });
    e.preventDefault();
  };

  private _navigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, page: Pages): void => {
    const { navigate } = this.props;
    navigate(page);
  };

  render = () => {
    const { email, message } = this.state;
    return (
      <>
        <Container className="Login" maxWidth="sm">
          <Box className="flexContainer">
            <Box className="formContainer">
              <Box className="logoContainer">
                <img src={logo} alt="CovidVault logo" />
              </Box>
              <h1>Reset Password</h1>
              <form onSubmit={this._formSubmit}>
                <TextField
                  name="email"
                  label={email.label}
                  className="input"
                  value={email.value}
                  onChange={this._formUpdate}
                  error={email.error}
                  autoFocus
                  required
                  fullWidth
                />
                <Box className="buttonContainer">
                  <Button variant="contained" color="primary" type="submit">
                    Reset Password
                  </Button>
                </Box>
                <Box className="linkContainer">
                  <Link
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this._navigate(e, Pages.register)}
                  >
                    Register
                  </Link>
                  <Link
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this._navigate(e, Pages.register)}
                  >
                    Login
                  </Link>
                </Box>
              </form>
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

const mapStateToProps = (state: ForgotPasswordStateTransfer) => {
  return {};
};

export default connect(mapStateToProps, { navigate })(ForgotPassword);

interface ForgotPasswordProps {
  navigate: (page: Pages) => Action<Pages>;
}
interface ForgotPasswordState {
  email: InputState;
  message: {
    show: boolean;
    severity: "info" | "success" | "error" | "warning";
    value: string;
  };
}
interface ForgotPasswordStateTransfer {}
