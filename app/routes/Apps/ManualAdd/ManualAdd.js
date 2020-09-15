import React from "react";
import _ from "lodash";
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
  FormGroup,
  Form,
  FormText,
} from "./../../../components";

import { HeaderMain } from "../../components/HeaderMain";

class ManualAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: (new Date()).toISOString().slice(0, 10),
      visitors: [{ name: "", phone: "", errorMsg: "", successMsg: "" }],
    };
  }

  _addRow = () => {
    this.setState({
      visitors: [...this.state.visitors, { name: "", phone: "", errorMsg: "", successMsg: "" }],
    });
  };

  _updateDate = (e) => {
    this.setState({ date: e.target.value });
  };

  _updateName = (e) => {
    const visitors = this.state.visitors;
    const id = _.toNumber(e.target.name.split("-")[1]);
    visitors[id] = {
      name: e.target.value,
      phone: visitors[id].phone,
      errorMsg: visitors[id].errorMsg,
      successMsg: visitors[id].successMsg,
    };
    this.setState({ visitors });
  };

  _updatePhone = (e) => {
    const visitors = this.state.visitors;
    const id = _.toNumber(e.target.name.split("-")[1]);
    visitors[id] = {
      name: visitors[id].name,
      phone: e.target.value,
      errorMsg: visitors[id].errorMsg,
      successMsg: visitors[id].successMsg,
    };
    this.setState({ visitors });
  };

  _addEntries = (e) => {
    const {visitors} = this.state;
    visitors.forEach((visitor) => {
      axios
        .post(
          "../../api/entry/" + localStorage.accountID,
          {
            arr: this.state.date,
            name: visitor.name,
            phone: visitor.phone,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            visitor.errorMsg = "";
            visitor.successMsg = response.data.messages[0];
          } else {
            visitor.errorMsg = response.data.messages[0];
            visitor.successMsg = "";
          }
        })
        .catch((err) => {
          visitor.successMsg = "";
          visitor.errorMsg = err.response.data.messages[0];
        }).finally(() => {
          this.setState({ visitors });
        });
    });
    e.preventDefault();
  };

  render() {
    let { visitors } = this.state;
    return (
      <React.Fragment>
        <Container>
          <HeaderMain title="Manually Add Visitors" className="mb-5 mt-4" />
          {/* START Content */}
          <Row>
            <Col lg={12}>
              <Card className="mb-3">
                <CardBody>
                  <div className="d-flex mb-4">
                    <CardTitle tag="h6">Add Visitors</CardTitle>
                    <span className="ml-auto align-self-start small">
                      Fields marked with <span className="text-danger">*</span> are required.
                    </span>
                  </div>
                  <Form onSubmit={this._addEntries}>
                    <FormGroup row>
                      <Col sm={6} />
                      <Label for="datePicker" sm={2} className="text-right">
                      <span className="text-danger">*</span> Date
                      </Label>
                      <Col sm={3}>
                        <Input type="date" value={this.state.date} onChange={this._updateDate} />
                      </Col>
                    </FormGroup>
                    {visitors.map((val, i) => {
                      const nameID = `name-${i}`;
                      const phoneID = `phone-${i}`;
                      const errMsg = val.errorMsg.length === 0 ? null : <FormText color="warning">{val.errorMsg}</FormText>;
                      const successMsg =
                        val.successMsg.length === 0 ? null : <FormText color="success">{val.successMsg}</FormText>;
                      return (
                        <FormGroup row key={i}>
                          <Label for={nameID} sm={2} className="text-right">
                          <span className="text-danger">*</span> Name
                          </Label>
                          <Col sm={4}>
                            <Input type="text" name={nameID} id={nameID} key={i} value={val.name} onChange={this._updateName} />
                          </Col>
                          <Label for={phoneID} sm={2} className="text-right">
                          <span className="text-danger">*</span> Phone
                          </Label>
                          <Col sm={3}>
                            <Input
                              type="text"
                              name={phoneID}
                              id={phoneID}
                              key={i}
                              value={val.phone}
                              onChange={this._updatePhone}
                            />
                          </Col>
                          {errMsg}
                          {successMsg}
                        </FormGroup>
                      );
                    })}
                    <FormGroup row>
                      <Col lg={8} />
                      <Col sm={2}>
                        <Button color="primary" onClick={this._addRow}>
                          <i className="fa fa-fw fa-plus-circle"></i>Add Row
                        </Button>
                      </Col>
                      <Col sm={2}>
                        <Button color="primary">
                          <i className="fa fa-fw fa-arrow-circle-up" onClick={this._addEntries}></i>Submit
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
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ManualAdd;
