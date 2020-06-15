import React from "react";
import _ from "lodash"

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

class ManualAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitors: [{ name: "", phone: "" }],
    };
  }

  _addRow = () => {
    this.setState({
      visitors: [...this.state.visitors, {name: "", phone: ""}]
    });
  }

  _updateName = (e) => {
    const visitors = this.state.visitors;
    const id = _.toNumber(e.target.name.split('-')[1]);
    visitors[id] = {name: e.target.value, phone: visitors[id].phone};
    this.setState({ visitors });
  }

  _updatePhone = (e) => {
    const visitors = this.state.visitors;
    const id = _.toNumber(e.target.name.split('-')[1]);
    visitors[id] = {name: visitors[id].name, phone: e.target.value};
    this.setState({ visitors });
  }

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
                      Fields mark as <span className="text-danger">*</span> is required.
                    </span>
                  </div>
                  <Form>
                    <FormGroup row>
                      <Col sm={6} />
                      <Label for="datePicker" sm={2} className="text-right">
                        Date
                      </Label>
                      <Col sm={3}>
                        <Input type="date" />
                      </Col>
                    </FormGroup>
                    {visitors.map((val, i) => {
                      const nameID = `name-${i}`;
                      const phoneID = `phone-${i}`;
                      return (
                        <FormGroup row key={i}>
                          <Label for={nameID} sm={2} className="text-right">
                            Name
                          </Label>
                          <Col sm={4}>
                            <Input type="text" name={nameID} id={nameID} key={i} value={val.name} onChange={this._updateName} />
                          </Col>
                          <Label for={phoneID} sm={2} className="text-right">
                            Phone
                          </Label>
                          <Col sm={3}>
                            <Input type="text" name={phoneID} id={phoneID} key={i} value={val.phone} onChange={this._updatePhone} />
                          </Col>
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
                          <i className="fa fa-fw fa-arrow-circle-up"></i>Submit
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
