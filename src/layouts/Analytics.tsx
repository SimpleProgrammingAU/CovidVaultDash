import "./Analytics.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Sidebar } from "../components";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { checkSession, fetchStatistics } from "../actions";
import { Statics as _C } from "../classes";
import { Action, Statistics } from "../interfaces";

class Analytics extends Component<AnalyticsProps, AnalyticsState> {
  componentDidMount = () => {
    const { fetchStatistics } = this.props;
    fetchStatistics();
  };

  render = () => {
    const { showDrawer, statistics } = this.props;
    const gridStyle = _C.GridWidth(showDrawer);
    const todayString = new Date().toDateString();
    const hourData = statistics.byHour.map((rowData, i) => {
      const hours = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
      return {
        name: hours[i],
        visitors: rowData,
      }
    });
    const dayData = statistics.byDay.map((rowData, i) => {
      const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return {
        name: week[i],
        visitors: rowData
      }
    });
    const recurringData = [
      {
        name: "Repeat Visitors",
        value: statistics.return,
      },
      {
        name: "First-time Visitors",
        value: 100 - statistics.return,
      },
    ];
    const apiData = statistics.api.map((rowData) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        name: `${months[rowData.month - 1]}-${rowData.year}`,
        value: rowData.count
      }
    });
    const apiGraphHeight = apiData.length * 40 + 50;
    return (
      <>
        <Header />
        <Sidebar />
        <Grid className="Analytics" style={gridStyle} spacing={4} justify={"center"} container>
          <Grid item md={6}>
            <Paper elevation={3} square>
              <h2>Visitors by Hour</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={hourData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div className="footer">Based on previous 28 days of visitor data.</div>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper elevation={3} square>
              <Paper elevation={3} square>
                <h2>Visitors by Day of Week</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="footer">Based on previous 28 days of visitor data.</div>
              </Paper>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper elevation={3} square>
              <h2>Visitors Today</h2>
              <p className="large">{statistics.today}</p>
              <div className="footer">Data for {todayString}.</div>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper elevation={3} square>
              <h2>Returning Visitors</h2>
              <ResponsiveContainer width="100%" height={110}>
                <PieChart>
                  <Pie
                    data={recurringData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="100%"
                    innerRadius={50}
                    outerRadius={80}
                    endAngle={180}
                  >
                    {recurringData.map((entry, i) => {
                      const colors = ["#8e9aaf", "#4a4e69"];
                      return <Cell key={`cell-${i}`} fill={colors[i]} />;
                    })}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="footer">Based on previous 28 days of visitor data.</div>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper elevation={3} square>
              <h2>API Requests</h2>
              <ResponsiveContainer width="100%" height={apiGraphHeight}>
                <BarChart data={apiData} layout="vertical" margin={{top: 5, right: 5, bottom: 5, left: 25}}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8e9aaf" />
                </BarChart>
              </ResponsiveContainer>
              <div className="footer">Note: free tier limit is 5,000 API calls per month.</div>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };
}

const mapStateToProps = (state: AnalyticsStateTransfer) => {
  const { loggedIn, showDrawer, statistics } = state;
  return {
    loggedIn,
    showDrawer,
    statistics,
  };
};

export default connect(mapStateToProps, { checkSession, fetchStatistics })(Analytics);

interface AnalyticsProps {
  checkSession: () => Action<boolean>;
  fetchStatistics: () => (dispatch: (action: Action<Statistics>) => void) => Promise<void>;
  loggedIn: boolean;
  showDrawer: boolean;
  statistics: Statistics;
}
interface AnalyticsState {}
interface AnalyticsStateTransfer {
  loggedIn: boolean;
  showDrawer: boolean;
  statistics: Statistics;
}
