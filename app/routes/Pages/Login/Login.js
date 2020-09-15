import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Form, FormGroup, FormText, Input, Button, Label, EmptyLayout, ThemeConsumer } from "./../../../components";

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.accountID !== "undefined" || localStorage.accountID !== undefined)
      axios.delete("../../api/sessions/" + localStorage.accountID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.accessToken,
        },
      });
    localStorage.clear();
    this.state = {
      username: "",
      password: "",
      btnText: "Sign In",
      errorMsg: [],
    };
  }

  _onUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onSubmit = () => {
    const errorMsg = [];
    if (
      this.state.username.length === 0 ||
      this.state.username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) === null
    )
      errorMsg.push("Invalid username entered.");
    if (this.state.password.length === 0) errorMsg.push("Password must be entered.");
    if (errorMsg.length === 0)
      axios
        .post(
          "../../api/session",
          {
            username: this.state.username,
            password: this.state.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            localStorage.accountID = response.data.data.accountID;
            localStorage.sessionID = response.data.data.sessionID;
            localStorage.accessToken = response.data.data.accessToken;
            localStorage.accessExpiry = Date.now() + response.data.data.accessExpiry * 1000;
            localStorage.refreshToken = response.data.data.refreshToken;
            localStorage.refreshExpiry = Date.now() + response.data.data.refreshExpiry * 1000;
            this.setState({ btnText: "Continue to Dashboard" });
          } else {
            this.setState({ errorMsg: [...errorMsg, response.data.messages] });
          }
        })
        .catch((err) => {
          this.setState({ errorMsg: [...errorMsg, err.response.data.messages] });
        });
    else this.setState({ errorMsg });
  };
  render() {
    const username =
      this.state.btnText !== "Sign In" ? null : (
        <FormGroup>
          <Label for="emailAdress">Email Address</Label>
          <Input
            type="email"
            name="username"
            id="emailAdress"
            placeholder="Enter email..."
            className="bg-white"
            onChange={this._onUpdate}
          />
        </FormGroup>
      );
    const password =
      this.state.btnText !== "Sign In" ? null : (
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            className="bg-white"
            onChange={this._onUpdate}
          />
        </FormGroup>
      );
    const msg =
      this.state.errorMsg.length === 0 ? null : (
        <FormGroup>
          <FormText color="red">
            {this.state.errorMsg.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </FormText>
        </FormGroup>
      );
    const btn =
      this.state.btnText === "Sign In" ? (
        <ThemeConsumer>
          {({ color }) => (
            <Button color={color} block onClick={this._onSubmit}>
              {this.state.btnText}
            </Button>
          )}
        </ThemeConsumer>
      ) : (
        <ThemeConsumer>
          {({ color }) => (
            <Button color={color} block tag={Link} to="/">
              {this.state.btnText}
            </Button>
          )}
        </ThemeConsumer>
      );
    return (
      <EmptyLayout>
        <EmptyLayout.Section center>
          {/* START Header */}
          <HeaderAuth
            title="Sign in to CovidVault Account"
            text="Update account details, add visitor entries, place data request"
          />
          {/* END Header */}
          {/* START Form */}
          <Form className="mb-3" onSubmit={this._onSubmit}>
            {username}
            {password}
            {msg}
            {btn}
          </Form>
          {/* END Form */}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link to="/pages/forgotpassword" className="text-decoration-none">
              Forgot Password
            </Link>
            <Link to="/pages/register" className="ml-auto text-decoration-none">
              Register
            </Link>
          </div>
          {/* END Bottom Links */}
          {/* START Footer */}
          <FooterAuth />
          {/* END Footer */}
        </EmptyLayout.Section>
      </EmptyLayout>
    );
  }
}

export default Login;
