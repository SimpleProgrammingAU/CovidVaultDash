import React from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Input,
  Card,
  Button,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  CustomInput,
  FormGroup,
  FormText,
  Form,
} from "./../../../components";

import { HeaderMain } from "../../components/HeaderMain";

class AccountEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateSuccessMsg: "",
      errorMsg: [],
      businessName: "Loading...",
      authContact: "Loading...",
      email: "Loading...",
      phone: "Loading...",
      streetAddress: "Loading...",
      suburb: "Loading...",
      state: "ACT",
      postcode: "Loading...",
      updateFormBtnText: "Loading...",
      logoSuccessMsg: "",
      logoErrorMsg: [],
      logo: undefined,
      passwordSuccessMsg: "",
      passwordErrorMsg: [],
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      followOnSuccessMsg: "",
      followOnErrorMsg: [],
      followOnText: "",
      followOnImg: undefined,
      followOnImgUrl: "",
      followOnURL: "",
      followOnExpiry: "",
    };
  }

  _loadDetails = () => {
    axios
      .get("../../api/account/" + localStorage.accountID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.accessToken,
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            businessName: response.data.data.name,
            authContact: response.data.data.authContact,
            email: response.data.data.email,
            phone: response.data.data.phone,
            streetAddress: response.data.data.streetAddress,
            suburb: response.data.data.suburb,
            state: response.data.data.state,
            postcode: response.data.data.postcode,
            updateFormBtnText: "Update Details",
          });
        } else {
          setTimeout(this._loadDetails, 10000);
        }
      })
      .catch((err) => {
        console.error(err.response.data.messages);
        setTimeout(this._loadDetails, 1000);
      });
    axios
      .get("../../api/followon/" + localStorage.accountID, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            followOnText: response.data.data.text,
            followOnImgUrl: "../../images/" + response.data.data.img,
            followOnURL: response.data.data.url,
            followOnExpiry: response.data.data.expiry,
          });
        }
      })
      .catch((err) => {
        if (err.response.data.statusCode !== 404) console.error(err.response.data.messages);
      });
  };

  _updateFormChange = (e) => {
    if (e.target.name === "phone" && e.target.value.substr(0, 3) !== "+61") this.setState({ phone: "+61" });
    else
      this.setState({
        [e.target.name]: e.target.value,
      });
  };

  _logoChange = (e) => {
    if (e.target.files !== null) {
      this.setState({ logo: e.target.files[0] });
    }
  };

  _followThruChange = (e) => {
    if (e.target.name === "followOnImg" && e.target.files !== null)
      this.setState({
        followOnImgUrl: URL.createObjectURL(e.target.files[0]),
        followOnImg: e.target.files[0],
      });
    else
      this.setState({
        [e.target.name]: e.target.value,
      });
  };

  _passwordChange = (e) => {
    const { oldPassword, newPassword } = this.state;
    const errorMsg = [];
    if (oldPassword.length > 0) {
      if (oldPassword === newPassword) errorMsg.push("The new password cannot be the same as the old password.");
    }
    this.setState({
      [e.target.name]: e.target.value,
      passwordErrorMsg: errorMsg,
    });
  };

  _passwordCheck = () => {
    const { newPassword, confirmNewPassword } = this.state;
    if (newPassword !== confirmNewPassword)
      this.setState({ passwordErrorMsg: ["New password must match confirmation password."] });
  };

  _sendProfileUpdate = (e) => {
    const errorMsg = [];
    if (
      this.state.email.length === 0 ||
      this.state.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) === null
    )
      errorMsg.push("Invalid email address entered.");
    if (this.state.phone.length !== 12 || this.state.phone.match(/[A-Z|a-z]/) !== null)
      errorMsg.push("Invalid contact number entered. It must be in the format +61 and total 14 characters.");
    if (this.state.businessName.length === 0) errorMsg.push("Business name must not be blank.");
    if (this.state.authContact.length === 0) errorMsg.push("Authorised contact name must not be blank.");
    if (this.state.streetAddress.length === 0) errorMsg.push("Street address must not be blank.");
    if (this.state.suburb.length === 0) errorMsg.push("Suburb/town name must not be blank.");
    if (this.state.postcode.length !== 4 || this.state.postcode.match(/(\d{4})/) === null)
      errorMsg.push("Postcode must be four numbers.");
    this.setState({ updateFormBtnText: "Please wait..." });
    axios
      .patch(
        "../../api/account/" + localStorage.accountID,
        {
          businessName: this.state.businessName,
          authContact: this.state.authContact,
          email: this.state.email,
          phone: this.state.phone,
          streetAddress: this.state.streetAddress,
          suburb: this.state.suburb,
          state: this.state.state,
          postcode: this.state.postcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.accessToken,
          },
        }
      )
      .then((response) => {
        if (response.data.success)
          this.setState({ updateSuccessMsg: response.data.messages[0], errorMsg, updateFormBtnText: "Update Details" });
        else this.setState({ errorMsg: [...errorMsg, response.data.messages], updateFormBtnText: "Update Details" });
      })
      .catch((err) => {
        this.setState({
          updateSuccessMsg: "",
          errorMsg: [...errorMsg, err.response.data.messages],
          updateFormBtnText: "Update Details",
        });
      });
    e.preventDefault();
  };

  _sendLogoUpdate = (e) => {
    const formData = new FormData();
    formData.append("logo", this.state.logo, this.state.logo.name);
    axios
      .post("../../api/account/" + localStorage.accountID, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: localStorage.accessToken },
      })
      .then((response) => {
        if (response.data.success)
          this.setState({
            logoErrorMsg: [],
            logoSuccessMsg: response.data.messages[0],
          });
        else
          this.setState({
            logoErrorMsg: response.data.messages,
            logoSuccessMsg: "",
          });
      })
      .catch((err) => {
        this.setState({
          updateSuccessMsg: "",
          errorMsg: err.response.data.messages,
        });
      });
    e.preventDefault();
  };

  _sendFollowThruUpdate = (e) => {
    const formData = new FormData();
    const errMsg = [];
    formData.append("text", this.state.followOnText);
    if (typeof this.state.followOnImg !== "undefined")
      formData.append("imgFile", this.state.followOnImg, this.state.followOnImg.name);
    if (this.state.followOnURL.length === 0) errMsg.push("Link URL must be set");
    else formData.append("url", this.state.followOnURL);
    formData.append("type", 10001); //Only value at present
    formData.append("expiry", this.state.followOnExpiry);

    if (errMsg.length > 0) this.setState({ followOnErrorMsg: errMsg });
    else
      axios
        .post("../../api/followon/" + localStorage.accountID, formData, {
          headers: {
            Authorization: localStorage.accessToken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.success)
            this.setState({
              followOnErrorMsg: [],
              followOnSuccessMsg: response.data.messages[0],
            });
          else
            this.setState({
              followOnErrorMsg: response.data.messages,
              followOnSuccessMsg: "",
            });
        })
        .catch((err) => {
          this.setState({
            followOnSuccessMsg: "",
            followOnErrorMsg: err.response.data.messages,
          });
        });

    e.preventDefault();
  };

  _sendFollowThruDelete = () => {
    axios
      .delete("../../api/followon/" + localStorage.accountID, {
        headers: {
          Authorization: localStorage.accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success)
          this.setState({
            followOnErrorMsg: [],
            followOnSuccessMsg: response.data.messages[0],
          });
        else
          this.setState({
            followOnErrorMsg: response.data.messages,
            followOnSuccessMsg: "",
          });
      })
      .catch((err) => {
        this.setState({
          followOnSuccessMsg: "",
          followOnErrorMsg: err.response.data.messages,
        });
      });
  };

  _sendPasswordUpdate = (e) => {
    const errorMsg = [];
    if (this.state.newPassword !== this.state.confirmNewPassword) errorMsg.push("New passwords must match.");
    if (this.state.newPassword.length < 8) errorMsg.push("New password must be at least 8 characters in length.");
    if (errorMsg.length === 0)
      axios
        .patch(
          "../../api/account/" + localStorage.accountID,
          {
            password: this.state.oldPassword,
            newPassword: this.state.newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.data.success) this.setState({ passwordErrorMsg: [], passwordSuccessMsg: response.data.messages[0] });
          else this.setState({ passwordErrorMsg: response.data.messages });
        })
        .catch((err) => {
          this.setState({
            passwordSuccessMsg: "",
            passwordErrorMsg: err.response.data.messages,
          });
        });
    else this.setState({ passwordErrorMsg: errorMsg });
    e.preventDefault();
  };

  componentDidMount() {
    this._loadDetails();
  }

  render() {
    const updateSuccessMsg =
      this.state.updateSuccessMsg.length === 0 ? null : <FormText color="success">{this.state.updateSuccessMsg}</FormText>;
    const errorMsg =
      this.state.errorMsg.length === 0 ? null : (
        <FormText color="red">
          {this.state.errorMsg.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </FormText>
      );
    const logoSuccessMsg =
      this.state.logoSuccessMsg.length === 0 ? null : <FormText color="success">{this.state.logoSuccessMsg}</FormText>;
    const logoErrorMsg =
      this.state.logoErrorMsg.length === 0 ? null : (
        <FormText color="red">
          {this.state.logoErrorMsg.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </FormText>
      );
    const followThru = {
      successMsg:
        this.state.followOnSuccessMsg.length === 0 ? null : (
          <FormText color="success">{this.state.followOnSuccessMsg}</FormText>
        ),
      errorMsg:
        this.state.followOnErrorMsg.length === 0 ? null : (
          <FormText color="red">
            {this.state.followOnErrorMsg.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </FormText>
        ),
      demo: {
        text:
          this.state.followOnText.length === 0 ? null : (
            <p style={{ marginBlockEnd: "0" }}>
              <a
                href={this.state.followOnURL}
                style={{
                  fontSize: "150%",
                  fontWeight: "500",
                  fontStyle: "italic",
                  color: "#6247aa",
                  textDecoration: "overline underline",
                }}
              >
                {this.state.followOnText}
              </a>
            </p>
          ),
        img:
          this.state.followOnImgUrl.length === 0 ? null : (
            <a href={this.state.followOnURL}>
              <img src={this.state.followOnImgUrl} alt="Follow on link" style={{ maxWidth: "100%" }} />
            </a>
          ),
      },
    };
    const passwordSuccessMsg =
      this.state.passwordSuccessMsg.length === 0 ? null : <FormText color="success">{this.state.passwordSuccessMsg}</FormText>;
    const passwordErrorMsg =
      this.state.passwordErrorMsg.length === 0 ? null : (
        <FormText color="red">
          {this.state.passwordErrorMsg.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </FormText>
      );
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title="Account Edit" className="mb-5 mt-4" />
          {/* START Account Details */}
          <Row>
            <Col lg={12}>
              <Card className="mb-3">
                <CardBody>
                  <div className="d-flex mb-4">
                    <CardTitle tag="h6">Update Account Details</CardTitle>
                    <span className="ml-auto align-self-start small">
                      Fields marked with <span className="text-danger">*</span> are required.
                    </span>
                  </div>
                  <Form onSubmit={this._sendProfileUpdate}>
                    <FormGroup row>
                      <Label for="businessName" sm={3} className="text-right">
                        <span className="text-danger">*</span> Business Name
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="businessName"
                          id="businessName"
                          value={this.state.businessName}
                          onChange={this._updateFormChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="authContact" sm={3} className="text-right">
                        <span className="text-danger">*</span> Authorised Contact
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="authContact"
                          id="authContact"
                          value={this.state.authContact}
                          onChange={this._updateFormChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="email" sm={3} className="text-right">
                        <span className="text-danger">*</span> Contact Email
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          value={this.state.email}
                          onChange={this._updateFormChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="phone" sm={3} className="text-right">
                        <span className="text-danger">*</span> Contact Number
                      </Label>
                      <Col sm={8}>
                        <Input type="text" name="phone" id="phone" value={this.state.phone} onChange={this._updateFormChange} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="streetAddress" sm={3} className="text-right">
                        <span className="text-danger">*</span> Address
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          value={this.state.streetAddress}
                          onChange={this._updateFormChange}
                        />
                      </Col>
                      <Col sm={3} />
                      <Col sm={4}>
                        <Input
                          type="text"
                          name="suburb"
                          id="suburb"
                          value={this.state.suburb}
                          onChange={this._updateFormChange}
                        />
                      </Col>
                      <Col sm={2}>
                        <CustomInput
                          type="select"
                          name="state"
                          id="state"
                          value={this.state.state}
                          onChange={this._updateFormChange}
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
                      </Col>
                      <Col sm={2}>
                        <Input
                          type="text"
                          name="postcode"
                          id="postcode"
                          value={this.state.postcode}
                          onChange={this._updateFormChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      {updateSuccessMsg}
                      {errorMsg}
                      <Label sm={3}></Label>
                      <Col sm={8}>
                        <Button color="primary" onClick={this._sendProfileUpdate}>
                          {this.state.updateFormBtnText}
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-support text-muted mr-2"></i>
                  If you have trouble with the configuration, you can contact us.{" "}
                  <a href="mailto:covid.register@simpleprogramming.com.au">We Can Help</a>
                </CardFooter>
              </Card>
            </Col>
            {/* END Account Details */}
          </Row>
          <Row>
            {/* START Logo Update */}
            <Col lg={12}>
              <Card className="mb-3">
                <CardBody>
                  <div className="d-flex mb-4">
                    <CardTitle tag="h6">Update Logo</CardTitle>
                  </div>
                  <Form onSubmit={this._sendLogoUpdate}>
                    <FormGroup row>
                      <Label for="logo" sm={3} className="text-right">
                        Select Image File
                      </Label>
                      <Col sm={8}>
                        <Input type="file" name="logo" id="logo" onChange={this._logoChange} />
                      </Col>
                    </FormGroup>
                    {logoSuccessMsg}
                    {logoErrorMsg}
                    <FormGroup row>
                      <Label sm={3}></Label>
                      <Col sm={8}>
                        <Button color="primary" onClick={this._sendLogoUpdate}>
                          Update Logo
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-support text-muted mr-2"></i>
                  If you have trouble with the configuration, you can contact us.{" "}
                  <a href="mailto:covid.register@simpleprogramming.com.au">We Can Help</a>
                </CardFooter>
              </Card>
            </Col>
            {/* END Logo Update */}
          </Row>
          <Row>
            {/* START Follow-thru */}
            <Col md={8}>
              <Card className="mb-3">
                <CardBody>
                  <div className="d-flex mb-4">
                    <CardTitle tag="h6">Follow-thru Link</CardTitle>
                  </div>
                  <Form onSubmit={this._sendFollowThruUpdate}>
                    <FormGroup row>
                      <Label for="followOnText" sm={3} className="text-right">
                        Link Text / Heading
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="followOnText"
                          id="followOnText"
                          value={this.state.followOnText}
                          onChange={this._followThruChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="followOnImg" sm={3} className="text-right">
                        Select Image File
                      </Label>
                      <Col sm={8}>
                        <Input type="file" name="followOnImg" id="followOnImg" onChange={this._followThruChange} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="followOnURL" sm={3} className="text-right">
                        Link URL
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="followOnURL"
                          id="followOnURL"
                          value={this.state.followOnURL}
                          onChange={this._followThruChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="followOnExpiry" sm={3} className="text-right">
                        Expiry Date
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="date"
                          name="followOnExpiry"
                          id="followOnExpiry"
                          value={this.state.followOnExpiry}
                          onChange={this._followThruChange}
                        />
                      </Col>
                    </FormGroup>
                    {followThru.successMsg}
                    {followThru.errorMsg}
                    <FormGroup row>
                      <Label sm={3}></Label>
                      <Col sm={4}>
                        <Button color="btn btn-primary" onClick={this._sendFollowThruUpdate}>
                          Update Follow-thru Link
                        </Button>
                      </Col>
                      <Col sm={4}>
                        <Button color="btn btn-outline-danger" onClick={this._sendFollowThruDelete}>
                          Remove Follow-thru Link
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-support text-muted mr-2"></i>
                  If you have trouble with the configuration, you can contact us.{" "}
                  <a href="mailto:covid.register@simpleprogramming.com.au">We Can Help</a>
                </CardFooter>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <CardBody>
                  <div className="d-flex mb-4">
                    <CardTitle tag="h6">Follow-thru Demo</CardTitle>
                  </div>
                  {followThru.demo.text}
                  {followThru.demo.img}
                </CardBody>
              </Card>
            </Col>
            {/* END Follow-thru */}
          </Row>
          <Row>
            {/* START Password Change */}
            <Col lg={12}>
              <Card className="mb-3">
                <CardBody>
                  <div className="d-flex mb-4">
                    <CardTitle tag="h6">Change Password</CardTitle>
                    <span className="ml-auto align-self-start small">
                      Fields mark as <span className="text-danger">*</span> is required.
                    </span>
                  </div>
                  <Form onSubmit={this._sendPasswordUpdate}>
                    <FormGroup row>
                      <Label for="oldPassword" sm={3} className="text-right">
                        <span className="text-danger">*</span> Old Password
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="password"
                          name="oldPassword"
                          id="oldPassword"
                          value={this.state.oldPassword}
                          onChange={this._passwordChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="newPassword" sm={3} className="text-right">
                        <span className="text-danger">*</span> New Password
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          value={this.state.newPassword}
                          onChange={this._passwordChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0">
                      <Label for="confirmNewPassword" sm={3} className="text-right">
                        <span className="text-danger">*</span> Confirm New Password
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="password"
                          name="confirmNewPassword"
                          id="confirmNewPassword"
                          value={this.state.confirmNewPassword}
                          onChange={this._passwordChange}
                          onBlur={this._passwordCheck}
                        />
                      </Col>
                    </FormGroup>
                    {passwordSuccessMsg}
                    {passwordErrorMsg}
                    <FormGroup row>
                      <Label sm={3}></Label>
                      <Col sm={8}>
                        <Button color="primary" onClick={this._sendPasswordUpdate}>
                          Update Password
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-support text-muted mr-2"></i>
                  If you have trouble with the configuration, you can contact us.{" "}
                  <a href="mailto:covid.register@simpleprogramming.com.au">We Can Help</a>
                </CardFooter>
              </Card>
            </Col>
            {/* END Password Change */}
          </Row>
          <Row>
            {/* START Delete Account */}
            <Col>
              <Card className="mb-3 b-danger">
                <CardBody>
                  <CardTitle tag="h6" className="text-danger">
                    Delete Account
                  </CardTitle>
                  <p>Once you delete your account, there is no going back. Please be certain.</p>
                  <p>
                    Please note: account deletion takes approximately two weeks to complete in order to ensure all contacts have
                    expired.
                  </p>
                  <Button color="danger" outline>
                    Yes, Delete
                  </Button>
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-support text-muted mr-2"></i>
                  If you have trouble with the configuration, you can contact us.{" "}
                  <a href="mailto:covid.register@simpleprogramming.com.au">We Can Help</a>
                </CardFooter>
              </Card>
            </Col>
            {/* END Delete Account */}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default AccountEdit;
