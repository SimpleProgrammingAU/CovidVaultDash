import "./Login.css";
import logo from "../assets/images/logo.svg";

import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";

import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import { Action, AxiosError, InputState, Response, Session } from "../interfaces";
import { checkSession, navigate, updateSession } from "../actions";
import { AttributionBox } from "../components";
import { Pages } from "../enums";

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: {
        label: "Email address",
        value: "",
        error: false,
      },
      password: {
        label: "Password",
        value: "",
        error: false,
      },
      message: {
        value: "",
        show: false,
        severity: "success",
      },
    };
    this.props.checkSession();
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

  private _emailValidate = (): boolean => {
    const { email } = this.state;
    if (email.value.search(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/) === -1) {
      this.setState({ email: { ...email, error: true } });
      return false;
    } else if (email.error) this.setState({ email: { ...email, error: false } });
    return true;
  };

  private _formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { navigate, updateSession } = this.props;
    const { email, password } = this.state;

    if (this._emailValidate()) {
      axios
        .post(
          `https://covidvault.com.au/api/session`,
          {
            username: email.value,
            password: password.value,
          },
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response: AxiosResponse<Response<Session>>) => {
          if (response.data.success) {
            const { accountID, sessionID, accessToken, accessExpiry, refreshToken, refreshExpiry } = response.data.data;
            localStorage.setItem("accountID", accountID);
            localStorage.setItem("sessionID", sessionID);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("accessExpiry", (Date.now() + accessExpiry).toString());
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("refreshExpiry", (Date.now() + refreshExpiry).toString());
            updateSession(true);
            navigate(Pages.account);
          } else {
            this.setState({ message: { value: response.data.messages[0], show: true, severity: "error" } });
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

  private _formUpdate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
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

  private _navigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, page: Pages): void => {
    const { navigate } = this.props;
    navigate(page);
    e.preventDefault();
  };

  componentDidUpdate = () => {
    if (this.props.loggedIn) this.props.navigate(Pages.account);
  }

  render = (): ReactNode => {
    const { email, password, message } = this.state;
    return (
      <>
        <Container className="Login" maxWidth="sm">
          <Box className="flexContainer">
            <Box className="formContainer">
              <Box className="logoContainer">
                <img src={logo} alt="CovidVault logo" />
              </Box>
              <h1>Dashboard Login</h1>
              <form onSubmit={this._formSubmit}>
                <TextField
                  name="email"
                  label={email.label}
                  className="input"
                  value={email.value}
                  onChange={this._formUpdate}
                  onBlur={this._emailValidate}
                  error={email.error}
                  autoFocus
                  required
                  fullWidth
                />
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
                <Box className="buttonContainer">
                  <Button variant="contained" color="primary" type="submit">
                    Login
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
                    Forgot password
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

const mapStateToProps = (state: LoginStateTransfer) => {
  const { loggedIn } = state;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, { checkSession, navigate, updateSession })(Login);

interface LoginProps {
  checkSession: () => Action<boolean> | ((dispatch: (action: Action<boolean>) => void) => Promise<void>);
  navigate: (page: Pages) => Action<Pages>;
  updateSession: (loggedIn: boolean) => Action<boolean>;
  loggedIn: boolean;
}
interface LoginState {
  email: InputState;
  password: InputState;
  message: {
    value: string;
    show: boolean;
    severity: "error" | "info" | "success";
  };
}
interface LoginStateTransfer {
  loggedIn: boolean;
}
