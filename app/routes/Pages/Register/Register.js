import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Form,
  FormGroup,
  FormText,
  Input,
  CustomInput,
  Button,
  Label,
  EmptyLayout,
  ThemeConsumer,
} from "./../../../components";

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

class Register extends React.Component {
  state = {
    email: "",
    phone: "",
    password: "",
    passwordConf: "",
    businessName: "",
    authContact: "",
    streetAddress: "",
    suburb: "",
    state: "ACT",
    postcode: "",
    acceptTerms: "",
    errorMsg: [],
    successMsg: "",
  };

  _formUpdate = (e) => {
    if (e.target.name === 'phone' && e.target.value.substr(0, 3) !== '+61') this.setState({ 'phone': '+61'})
    else this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _formSubmit = (e) => {
    //Check state values
    const errorMsg = [];
    if (this.state.email.length === 0 || this.state.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null)
      errorMsg.push("Invalid email address entered.");
    if (this.state.phone.length !== 12 || this.state.phone.match(/[A-Z|a-z]/) !== null)
      errorMsg.push("Invalid contact number entered. It must be in the format +61 and total 14 characters.");
    if (this.state.businessName.length === 0)
      errorMsg.push("Business name must not be blank.");
    if (this.state.authContact.length === 0)
    errorMsg.push("Authorised contact name must not be blank.");
    if (this.state.streetAddress.length === 0)
    errorMsg.push("Street address must not be blank.");
    if (this.state.suburb.length === 0)
    errorMsg.push("Suburb/town name must not be blank.");
    if (this.state.postcode.length !== 4 || this.state.postcode.match(/(\d{4})/) === null)
    errorMsg.push("Postcode must be four numbers.");
    if (this.state.acceptTerms !== 'yes')
    errorMsg.push("Must accept terms and privacy statement.");
    if (this.state.password.length < 7 || this.state.password !== this.state.passwordConf)
    errorMsg.push("Passwords must be at least 8 characters and must match.");
    if (errorMsg.length === 0 && this.state.password === this.state.passwordConf && this.state.password.length > 7)
      axios
        .post(
          "../../api/account/",
          {
            businessName: this.state.businessName,
            authContact: this.state.authContact,
            email: this.state.email,
            phone: this.state.phone,
            streetAddress: this.state.streetAddress,
            suburb: this.state.suburb,
            state: this.state.state,
            postcode: this.state.postcode,
            password: this.state.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.data.success) this.setState({ successMsg: response.data.messages[0], errorMsg });
          else this.setState({ errorMsg: [...errorMsg, response.data.messages] });
        })
        .catch((err) => {
          this.setState({ errorMsg: [...errorMsg, err.response.data.messages] });
        });
    else {
      this.setState({ errorMsg: errorMsg });
    }
    e.preventDefault();
  };

  render() {
    const err =
      this.state.errorMsg.length === 0 ? null : (
        <FormGroup>
          <FormText color="red">{this.state.errorMsg.map((err, i) => <p key={i}>{err}</p>)}</FormText>
        </FormGroup>
      );
    const success =
      this.state.successMsg.length === 0 ? (
        <HeaderAuth title="Create Account" />
      ) : (
        <HeaderAuth title="Account Created" text="Please check you email for confirmation message." />
      );
    const form =
      this.state.successMsg.length !== 0 ? null : (
        <Form className="mb-3" onSubmit={this._formSubmit}>
          <FormGroup>
            <Label for="email">Email Address</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email address..."
              className="bg-white"
              onChange={this._formUpdate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password..."
              className="bg-white"
              onChange={this._formUpdate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="passwordConf">Repeat Password</Label>
            <Input
              type="password"
              name="passwordConf"
              id="passwordConf"
              placeholder="Password..."
              className="bg-white"
              onChange={this._formUpdate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="businessName">Business Name</Label>
            <Input
              type="text"
              name="businessName"
              id="businessName"
              placeholder="Business name..."
              className="bg-white"
              onChange={this._formUpdate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="authContact">Authorised Contact Person</Label>
            <Input
              type="text"
              name="authContact"
              id="authContact"
              placeholder="Authorised contact person..."
              className="bg-white"
              onChange={this._formUpdate}
            />
            <FormText color="muted">This person will be responsible for all data requests made to the system.</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Contact Number</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Contact phone number..."
              className="bg-white"
              onChange={this._formUpdate}
              onFocus={this._formUpdate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="streetAddress">Street Address</Label>
            <Input
              type="text"
              name="streetAddress"
              id="streetAddress"
              placeholder="Street address..."
              className="bg-white"
              onChange={this._formUpdate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="suburb">Suburb</Label>
            <Input
              type="text"
              name="suburb"
              id="suburb"
              placeholder="Suburb / City..."
              className="bg-white"
              onChange={this._formUpdate}
            />
            <Label for="state">State</Label>
            <CustomInput
              type="select"
              name="state"
              id="state"
              placeholder="State"
              className="bg-white"
              onChange={this._formUpdate}
            >
              <option>ACT</option>
              <option>NSW</option>
              <option>NT</option>
              <option>QLD</option>
              <option>SA</option>
              <option>TAS</option>
              <option>VIC</option>
              <option>WA</option>
            </CustomInput>
            <Label for="postcode">Postcode</Label>
            <Input
              type="text"
              name="postcode"
              id="postcode"
              placeholder="Postcode..."
              className="bg-white"
              onChange={this._formUpdate}
            />
            <FormText color="muted">
              This address should match the address of the venue. If your business operates multiple venues, you will need a
              separate account for each one.
              <br />
              This may change in a future update.
            </FormText>
          </FormGroup>
          <FormGroup>
            <CustomInput
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              value="yes"
              label="Accept Terms and Privacy Policy"
              onChange={this._formUpdate}
              inline
            />
          </FormGroup>
          {err}
          <ThemeConsumer>
            {({ color }) => (
              <Button color={color} block onClick={this._formSubmit}>
                Create Account
              </Button>
            )}
          </ThemeConsumer>
        </Form>
      );
    return (
      <EmptyLayout>
        <EmptyLayout.Section center width={480}>
          {/* START Header */}
          {success}
          {/* END Header */}
          {form}
          {/* START Bottom Links */}
          <div className="d-flex mb-5">
            <Link to="/pages/forgot-password" className="text-decoration-none">
              Forgot Password
            </Link>
            <Link to="/pages/login" className="ml-auto text-decoration-none">
              Login
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

export default Register;
