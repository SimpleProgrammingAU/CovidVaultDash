import React from "react";
import { Link } from "react-router-dom";

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
  };

  _formUpdate = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  _formSubmit = (e) => {
    
    e.preventDefault();
  }

  render() {
    return (
      <EmptyLayout>
        <EmptyLayout.Section center width={480}>
          {/* START Header */}
          <HeaderAuth title="Create Account" />
          {/* END Header */}
          {/* START Form */}
          <Form className="mb-3" onSubmit={this._formSubmit}>
            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input type="text" name="text" id="email" placeholder="Email address..." className="bg-white" onChange={this._formUpdate} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="Password..." className="bg-white" onChange={this._formUpdate} />
            </FormGroup>
            <FormGroup>
              <Label for="passwordConf">Repeat Password</Label>
              <Input type="password" name="passwordConf" id="passwordConf" placeholder="Password..." className="bg-white" onChange={this._formUpdate} />
            </FormGroup>
            <FormGroup>
              <Label for="businessName">Business Name</Label>
              <Input type="text" name="businessName" id="businessName" placeholder="Business name..." className="bg-white" onChange={this._formUpdate} />
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
              <Input type="text" name="phone" id="phone" placeholder="Contact phone number..." className="bg-white" onChange={this._formUpdate} />
            </FormGroup>
            <FormGroup>
              <Label for="streetAddress">Street Address</Label>
              <Input type="text" name="streetAddress" id="streetAddress" placeholder="Street address..." className="bg-white" onChange={this._formUpdate} />
            </FormGroup>
            <FormGroup>
              <Label for="suburb">Suburb</Label>
              <Input type="text" name="suburb" id="suburb" placeholder="Suburb / City..." className="bg-white" onChange={this._formUpdate} />
              <Label for="state">State</Label>
              <CustomInput type="select" name="state" id="state" placeholder="State" className="bg-white" onChange={this._formUpdate}>
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
              <Input type="text" name="postcode" id="postcode" placeholder="Postcode..." className="bg-white" onChange={this._formUpdate} />
              <FormText color="muted">
                This address should match the address of the venue. If your business operates multiple venues, you will need a
                separate account for each one.
                <br />
                This may change in a future update.
              </FormText>
            </FormGroup>
            <FormGroup>
              <CustomInput type="checkbox" id="acceptTerms" label="Accept Terms and Privacy Policy" onChange={this._formUpdate} inline />
            </FormGroup>
            <ThemeConsumer>
              {({ color }) => (
                <Button color={color} block onClick={this._formSubmit}>
                  Create Account
                </Button>
              )}
            </ThemeConsumer>
          </Form>
          {/* END Form */}
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
