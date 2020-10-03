import "./AttributionBox.css";

import React, { Component } from "react";

import { Box } from "@material-ui/core";

export default class AttributionBox extends Component<{className?: string}, {}> {
  render() {
    return (
      <Box className={`AttributionBox ${(this.props.className) ? this.props.className : false}`}>
        <p>
          <b>CovidVault</b> is an open source project developed by{" "}
          <a href="https://www.simpleprogramming.com.au/">Simple Programming</a>.<br />
          This dashboard was built using the <a href="https://material-ui.com/">Material-UI</a> React components library.
          <br />
          &copy;2020 Simple Programming.
        </p>
      </Box>
    );
  }
}
