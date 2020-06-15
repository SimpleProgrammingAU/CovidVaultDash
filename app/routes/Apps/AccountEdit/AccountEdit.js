import React from "react";

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
  FormGroup,
  Form,
} from "./../../../components";

import { HeaderMain } from "../../components/HeaderMain";
import { CustomInput } from "reactstrap";

const AccountEdit = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Account Edit" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={12}>
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex mb-4">
                <CardTitle tag="h6">Update Account Details</CardTitle>
                <span className="ml-auto align-self-start small">
                  Fields mark as <span className="text-danger">*</span> is required.
                </span>
              </div>
              <Form>
                {/* START Input */}
                <FormGroup row>
                  <Label for="businessName" sm={3} className="text-right">
                    <span className="text-danger">*</span> Business Name
                  </Label>
                  <Col sm={8}>
                    <Input type="text" name="businessName" id="businessName" value="Covid Vault" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="authContact" sm={3} className="text-right">
                    <span className="text-danger">*</span> Authorised Contact
                  </Label>
                  <Col sm={8}>
                    <Input type="text" name="authContact" id="authContact" value="Sam Janda" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={3} className="text-right">
                    <span className="text-danger">*</span> Contact Email
                  </Label>
                  <Col sm={8}>
                    <Input type="email" name="email" id="email" value="covid.register@simpleprogramming.com.au" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="phone" sm={3} className="text-right">
                    <span className="text-danger">*</span> Contact Number
                  </Label>
                  <Col sm={8}>
                    <Input type="text" name="phone" id="phone" value="+61417227152" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="streetAddress" sm={3} className="text-right">
                    <span className="text-danger">*</span> Address
                  </Label>
                  <Col sm={8}>
                    <Input type="text" name="streetAddress" id="streetAddress" value="123 Fake Street" />
                  </Col>
                  <Col sm={3} />
                  <Col sm={4}>
                    <Input type="text" name="suburb" id="suburb" value="West Melbourne" />
                  </Col>
                  <Col sm={2}>
                    <CustomInput type="select" name="state" id="state">
                      <option>ACT</option>
                      <option>NSW</option>
                      <option>NT</option>
                      <option>QLD</option>
                      <option>SA</option>
                      <option>TAS</option>
                      <option selected>VIC</option>
                      <option>WA</option>
                    </CustomInput>
                  </Col>
                  <Col sm={2}>
                    <Input type="text" name="postcode" id="postcode" value="3003" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={3}></Label>
                  <Col sm={8}>
                    <Button color="primary">Update Profile</Button>
                  </Col>
                </FormGroup>
                {/* END Input */}
              </Form>
              {/* END Form */}
            </CardBody>
            <CardFooter className="small">
              <i className="fa fa-fw fa-support text-muted mr-2"></i>
              If you have trouble with the configuration, you can contact us.{" "}
              <a href="mailto:covid.register@simpleprogramming.com.au">We Can Help</a>
            </CardFooter>
          </Card>
        </Col>
        <Col lg={12}>
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex mb-4">
                <CardTitle tag="h6">Update Logo</CardTitle>
              </div>
              <Form>
                <FormGroup row>
                  <Label for="logo" sm={3} className="text-right">
                    Select Image File
                  </Label>
                  <Col sm={8}>
                    <Input type="file" name="logo" id="logo" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                <Label sm={3}></Label>
                  <Col sm={8}>
                    <Button color="primary">Update Logo</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col lg={12}>
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex mb-4">
                <CardTitle tag="h6">Change Password</CardTitle>
                <span className="ml-auto align-self-start small">
                  Fields mark as <span className="text-danger">*</span> is required.
                </span>
              </div>
              <Form>
                {/* START Input */}
                <FormGroup row>
                  <Label for="oldPassword" sm={3} className="text-right">
                    <span className="text-danger">*</span> Old Password
                  </Label>
                  <Col sm={8}>
                    <Input type="password" name="oldPassword" id="oldPassword" />
                  </Col>
                </FormGroup>
                {/* END Input */}
                {/* START Input */}
                <FormGroup row>
                  <Label for="newPassword" sm={3} className="text-right">
                    <span className="text-danger">*</span> New Password
                  </Label>
                  <Col sm={8}>
                    <Input type="password" name="newPassword" id="newPassword" />
                  </Col>
                </FormGroup>
                {/* END Input */}
                {/* START Input */}
                <FormGroup row className="mb-0">
                  <Label for="confirmNewPassword" sm={3} className="text-right">
                    <span className="text-danger">*</span> Confirm New Password
                  </Label>
                  <Col sm={8}>
                    <Input type="password" name="confirmNewPassword" id="confirmNewPassword" />
                  </Col>
                </FormGroup>
                {/* END Input */}
                {/* START Input */}
                <FormGroup row>
                  <Label sm={3}></Label>
                  <Col sm={8}>
                    <Button color="primary">Update Password</Button>
                  </Col>
                </FormGroup>
                {/* END Input */}
              </Form>
              {/* END Form */}
            </CardBody>
            <CardFooter className="small">
              <i className="fa fa-fw fa-support text-muted mr-2"></i>
              If you have trouble with the configuration, you can contact us.{" "}
              <a href="mailto:covid.register@simpleprogramming.com.au">We Can Help</a>
            </CardFooter>
          </Card>
          <Card className="mb-3 b-danger">
            <CardBody>
              <CardTitle tag="h6" className="text-danger">
                Delete Account
              </CardTitle>
              <p>Once you delete your account, there is no going back. Please be certain.</p>
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
      </Row>
      {/* END Content */}
    </Container>
  </React.Fragment>
);

export default AccountEdit;
