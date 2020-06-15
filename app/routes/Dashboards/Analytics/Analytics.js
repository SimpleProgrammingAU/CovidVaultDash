import React from "react";
import { Container, Row, Col, Card, CardBody, CardFooter, CardTitle } from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { PieChartWithPaddingAngleHalf } from "./../../Graphs/ReCharts/components/PieChartWithPaddingAngleHalf";
import { SimpleBarChart } from "./../../Graphs/ReCharts/components/SimpleBarChart";

export class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repeatData: [
        { name: "Repeat Visitors", value: 100 },
        { name: "First Time", value: 300 },
      ],
      entryData: [
          {name: "QR Code", value: 150},
            { name: "ShortLink", value: 50},
            {name: "Manual Entry", value: 200}
      ]
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid={false}>
          <HeaderMain title="Summary Statistics" className="mt-0 mb-3" />

          <Row className="mb-2">
            <Col sm={4}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6">Return Visitors</CardTitle>
                  <PieChartWithPaddingAngleHalf data={this.state.repeatData} />
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-mobile-phone text-muted mr-2"></i>
                  Statistics based on visitor phone number only.
                </CardFooter>
              </Card>
            </Col>
            <Col sm={4}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6">Data Entry Method</CardTitle>
                  <PieChartWithPaddingAngleHalf data={this.state.entryData} />
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-barcode text-muted mr-2"></i>
                  Utilises URL used to access check-in page.
                </CardFooter>
              </Card>
            </Col>
            <Col sm={4}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6">Click-thru</CardTitle>
                  <PieChartWithPaddingAngleHalf />
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-mouse-pointer text-muted mr-2"></i>
                  Will become available with the upcoming Follow-thru link feature.
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
                <Card>
                    <CardBody>
                        <CardTitle tag="h6">Visitors by Day of Week</CardTitle>
                        <SimpleBarChart />
                    </CardBody>
                </Card>
            </Col>
            <Col sm={6}>
                <Card>
                    <CardBody>
                        <CardTitle tag="h6">Visitors by Hour of Day</CardTitle>
                        <SimpleBarChart />
                    </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
