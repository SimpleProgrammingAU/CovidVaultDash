import "./Register.css";
import logo from "../assets/images/logo.svg";

import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";

import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";

import { Action, AxiosError, InputState, Response, Session } from "../interfaces";
import { navigate } from "../actions";
import { AttributionBox } from "../components";
import { api } from "../consts";
import { Pages } from "../enums";

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
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
      passwordConfirm: {
        label: "Repeat password",
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
      message: {
        value: "",
        show: false,
        severity: "success",
      },
    };
  }

  private _abnCheck = (): boolean => {
    const { abn } = this.state;
    let abnCleaned = abn.value.replace(/\D/g, "");
    if (abnCleaned.length !== 11) {
      this.setState({ abn: { ...abn, value: abnCleaned, error: true } });
      return false;
    } else {
      this.setState({ abn: { ...abn, value: abnCleaned, error: false } });
      return true;
    }
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

  private _emailValidate = (): boolean => {
    const { email } = this.state;
    if (email.value.search(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/) === -1) {
      this.setState({ email: { ...email, error: true } });
      return false;
    } else if (email.error) this.setState({ email: { ...email, error: false } });
    return true;
  };

  private _formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const {
      email,
      password,
      businessName,
      abn,
      authContactName,
      authContactPhone,
      streetAddress,
      suburb,
      state,
      postcode,
    } = this.state;
    if (
      this._abnCheck() &&
      this._emailValidate() &&
      this._passwordValidate() &&
      this._phoneValidate() &&
      this._postcodeCheck()
    ) {
      //Basic error checking
      let errorOut = false;
      if (businessName.value.length === 0) {
        this.setState({ businessName: { ...businessName, error: true } });
        errorOut = true;
      }
      if (authContactName.value.length === 0) {
        this.setState({ authContactName: { ...authContactName, error: true } });
        errorOut = true;
      }
      if (streetAddress.value.length === 0) {
        this.setState({ streetAddress: { ...streetAddress, error: true } });
        errorOut = true;
      }
      if (suburb.value.length === 0) {
        this.setState({ suburb: { ...suburb, error: true } });
        errorOut = true;
      }
      if (errorOut) return;

      api
        .post("/account", {
          email: email.value,
          password: password.value,
          businessName: businessName.value,
          abn: abn.value,
          authContact: authContactName.value,
          phone: authContactPhone.value,
          streetAddress: streetAddress.value,
          suburb: suburb.value,
          state: state.value,
          postcode: postcode.value,
        })
        .then((res: AxiosResponse<Response<Session>>) => {
          const { navigate } = this.props;
          if (res.data.success) {
            this.setState({
              message: {
                value: "New account created successfull. Please check your email for account confirmation.",
                show: true,
                severity: "success",
              },
            });
            window.setTimeout(() => navigate(Pages.login), 3000);
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

  private _passwordValidate = (): boolean => {
    const { password, passwordConfirm } = this.state;
    if (password.value !== passwordConfirm.value) {
      this.setState({ passwordConfirm: { ...passwordConfirm, error: true } });
      return false;
    } else {
      this.setState({ passwordConfirm: { ...passwordConfirm, error: false } });
      return true;
    }
  };

  private _phoneValidate = (): boolean => {
    const { authContactPhone } = this.state;
    let phoneCleaned = "+" + authContactPhone.value.replace(/\D/g, "");
    if (phoneCleaned.length !== 12) {
      this.setState({ authContactPhone: { ...authContactPhone, value: phoneCleaned, error: true } });
      return false;
    } else {
      this.setState({ authContactPhone: { ...authContactPhone, value: phoneCleaned, error: false } });
      return true;
    }
  };

  private _postcodeCheck = (): boolean => {
    const { postcode } = this.state;
    let postcodeCleaned = postcode.value.replace(/\D/g, "");
    if (postcodeCleaned.length !== 4) {
      this.setState({ postcode: { ...postcode, value: postcodeCleaned, error: true } });
      return false;
    } else {
      this.setState({ postcode: { ...postcode, value: postcodeCleaned, error: false } });
      return true;
    }
  };

  private _stateUpdate = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => {
    const { state } = this.state;
    this.setState({ state: { ...state, value: e.target.value as string } });
  };

  render = (): ReactNode => {
    const {
      email,
      password,
      passwordConfirm,
      businessName,
      abn,
      authContactName,
      authContactPhone,
      streetAddress,
      suburb,
      state,
      postcode,
      message,
    } = this.state;
    return (
      <Container className="Login" maxWidth="sm">
        <Box className="flexContainer">
          <Box className="formContainer">
            <Box className="logoContainer">
              <img src={logo} alt="CovidVault logo" />
            </Box>
            <h1>CovidVault Registration</h1>
            <form onSubmit={this._formSubmit}>
              <h2>Login Details</h2>
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
              <TextField
                name="passwordConfirm"
                label={passwordConfirm.label}
                className="input"
                type="password"
                value={passwordConfirm.value}
                onChange={this._formUpdate}
                onBlur={this._passwordValidate}
                error={passwordConfirm.error}
                required
                fullWidth
              />
              <h2>Business Details</h2>
              <TextField
                name="businessName"
                label={businessName.label}
                className="input"
                value={businessName.value}
                onChange={this._formUpdate}
                error={businessName.error}
                required
                fullWidth
              />
              <TextField
                name="abn"
                label={abn.label}
                className="input"
                value={abn.value}
                onChange={this._formUpdate}
                onBlur={this._abnCheck}
                error={abn.error}
                required
                fullWidth
              />
              <h2>Contact Details</h2>
              <TextField
                name="authContactName"
                label={authContactName.label}
                helperText="This will be the person responsible for managing any requests from the state health authorities."
                className="input"
                value={authContactName.value}
                onChange={this._formUpdate}
                error={authContactName.error}
                required
                fullWidth
              />
              <TextField
                name="authContactPhone"
                label={authContactPhone.label}
                className="input"
                value={authContactPhone.value}
                onChange={this._formUpdate}
                onBlur={this._phoneValidate}
                error={authContactPhone.error}
                required
                fullWidth
              />
              <h2>Venue Details</h2>
              <TextField
                name="streetAddress"
                label={streetAddress.label}
                className="input"
                value={streetAddress.value}
                onChange={this._formUpdate}
                error={streetAddress.error}
                required
                fullWidth
              />
              <TextField
                name="suburb"
                label={suburb.label}
                className="input"
                value={suburb.value}
                onChange={this._formUpdate}
                error={suburb.error}
                required
              />
              <FormControl required style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                <InputLabel shrink id="state-input-label">
                  State
                </InputLabel>
                <Select labelId="state-input-label" value={state.value} onChange={this._stateUpdate} error={state.error}>
                  <MenuItem value={"ACT"}>ACT</MenuItem>
                  <MenuItem value={"NSW"}>NSW</MenuItem>
                  <MenuItem value={"NT"}>NT</MenuItem>
                  <MenuItem value={"QLD"}>QLD</MenuItem>
                  <MenuItem value={"SA"}>SA</MenuItem>
                  <MenuItem value={"TAS"}>TAS</MenuItem>
                  <MenuItem value={"VIC"} selected>
                    VIC
                  </MenuItem>
                  <MenuItem value={"WA"}>WA</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="postcode"
                label={postcode.label}
                className="input"
                value={postcode.value}
                onChange={this._formUpdate}
                onBlur={this._postcodeCheck}
                error={postcode.error}
                required
              />
              <Box className="buttonContainer">
                <Button variant="contained" color="primary" type="submit">
                  Register
                </Button>
              </Box>
              <Box className="linkContainer">
                <Link href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this._navigate(e, Pages.login)}>
                  Login
                </Link>
                <Link
                  href="#"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => this._navigate(e, Pages.forgotPassword)}
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
    );
  };
}

const mapStateToProps = (state: RegisterStateTransfer) => {
  return {};
};

export default connect(mapStateToProps, { navigate })(Register);

interface RegisterProps {
  navigate: (page: Pages) => Action<Pages>;
}
interface RegisterState {
  email: InputState;
  password: InputState;
  passwordConfirm: InputState;
  businessName: InputState;
  abn: InputState;
  authContactName: InputState;
  authContactPhone: InputState;
  streetAddress: InputState;
  suburb: InputState;
  state: InputState;
  postcode: InputState;
  message: {
    value: string;
    show: boolean;
    severity: "error" | "success";
  };
}
interface RegisterStateTransfer {}
