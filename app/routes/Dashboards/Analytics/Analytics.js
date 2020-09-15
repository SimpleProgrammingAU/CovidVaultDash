import React from "react";
import { Container, Row, Col, Card, CardBody, CardFooter, CardTitle } from "./../../../components";
import { HeaderMain } from "../../components/HeaderMain";
import { PieChartWithPaddingAngleHalf } from "./../../Graphs/ReCharts/components/PieChartWithPaddingAngleHalf";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
} from "./../../../components/recharts";
import colors from "./../../../colors";
import axios from "axios";

export class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byDay: [{ name: "Monday", Visitors: 0 }],
      byHour: [{ name: "00:00", Visitors: 0 }],
      repeatData: [
        { name: "Repeat Visitors", value: 50 },
        { name: "First Time", value: 50 },
      ],
      todayCount: 0,
    };
    this._getData();
  }

  _getData = () => {
    axios
      .get("../../api/statistics/" + localStorage.accountID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.accessToken,
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            byDay: response.data.data.byDay.map((n, i) => {
              return { name: this._getDayLabel(i), Visitors: n };
            }),
            byHour: response.data.data.byHour
              .map((n, i) => {
                return { name: this._getHourLabel(i), Visitors: n };
              })
              .filter((row, i, arr) => {
                let hasSum = false;
                for (let a = 0; a < i; a++) {
                  if (arr[a].Visitors > 0) hasSum = true;
                }
                return row.Visitors > 0 || hasSum;
              }),
            repeatData: [
              { name: "Repeat Visitors", value: response.data.data.return },
              { name: "First Time", value: 100 - response.data.data.return },
            ],
            todayCount: response.data.data.today,
          });
        }
      })
      .catch((err) => {
        console.error(err.response.data.messages);
      });
  };

  _getDayLabel = (n) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[n];
  };

  _getHourLabel = (n) => {
    const hours = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];
    return hours[n];
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Container fluid={false}>
          <HeaderMain title="Summary Statistics" className="mt-0 mb-3" />

          <Row className="mb-2">
            <Col sm={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6">Visitors Today</CardTitle>
                  <h2>{this.state.todayCount}</h2>
                </CardBody>
                <CardFooter className="small">
                  <i className="fa fa-fw fa-barcode text-muted mr-2"></i>
                  Visitors recorded via CovidVault so far today.
                </CardFooter>
              </Card>
            </Col>
            <Col sm={6}>
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
          </Row>
          <Row>
            <Col sm={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6">Visitors by Day of Week</CardTitle>
                  <ResponsiveContainer width="100%" aspect={6.0 / 3.0}>
                    <BarChart data={this.state.byDay} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          background: colors["900"],
                          border: `1px solid ${colors["900"]}`,
                          color: colors["white"],
                        }}
                      />
                      <Legend wrapperStyle={{ color: colors["900"] }} />
                      <Bar dataKey="Visitors" fill={colors["primary"]} barGap={0} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
            <Col sm={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6">Visitors by Hour of Day</CardTitle>
                  <ResponsiveContainer width="100%" aspect={6.0 / 3.0}>
                    <BarChart data={this.state.byHour} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          background: colors["900"],
                          border: `1px solid ${colors["900"]}`,
                          color: colors["white"],
                        }}
                      />
                      <Legend wrapperStyle={{ color: colors["900"] }} />
                      <Bar dataKey="Visitors" fill={colors["primary"]} barGap={0} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
