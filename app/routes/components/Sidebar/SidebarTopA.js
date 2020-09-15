import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { Sidebar, Avatar } from "./../../../components";

class SidebarTopA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      name: "",
      logo: "",
    };
  }

  componentDidMount() {
    this._checkLogin(this._loadDetails);
  }

  _loadDetails = () => {
    axios
      .get("../../api/account/" + localStorage.accountID, {
        headers: {
          Authorization: localStorage.accessToken,
        },
      })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            name: response.data.data.authContact,
            logo: response.data.data.logo,
          });
        } else setTimeout(this._loadDetails, 10000);
      }).catch(() => setTimeout(this._loadDetails, 1000));
  };

  _checkLogin = (callback = function () {}) => {
    const { accountID, sessionID, accessToken, accessExpiry, refreshToken, refreshExpiry } = localStorage;
    if (
      accountID === undefined ||
      accountID === "undefined" ||
      sessionID === undefined ||
      accessToken === undefined ||
      refreshToken === undefined ||
      accessExpiry === undefined ||
      refreshExpiry === undefined
    )
      this.setState({ redirect: true });
    if (refreshExpiry < Date.now()) this.setState({ redirect: true });
    if (accessExpiry < Date.now()) {
      axios
        .patch(
          "../../api/session/" + sessionID,
          {
            refreshToken: refreshToken,
          },
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            localStorage.accessToken = response.data.data.accessToken;
            localStorage.accessExpiry = Date.now() + response.data.data.accessExpiry * 1000;
            localStorage.refreshToken = response.data.data.refreshToken;
            localStorage.refreshExpiry = Date.now() + response.data.data.refreshExpiry * 1000;
          } else this.setState({ redirect: true });
        })
        .catch(() => {
          this.setState({ redirect: true });
        });
    }
    callback();
  };
  render() {
    const redirect = this.state.redirect ? <Redirect push to="/pages/login" exact /> : null;
    const logoSrc = "../../images/" + this.state.logo;
    return (
      <React.Fragment>
        {redirect}
        {/* START: Sidebar Default */}
        <Sidebar.HideSlim>
          <Sidebar.Section className="pt-0">
            <Link to="/dashboards/account" className="d-block">
              <Sidebar.HideSlim>
                <Avatar.Image size="lg" src={logoSrc} />
              </Sidebar.HideSlim>
            </Link>
            <p className="pl-0 pb-0 btn-profile sidebar__link">{this.state.name}</p>
          </Sidebar.Section>
        </Sidebar.HideSlim>
        {/* END: Sidebar Default */}

        {/* START: Sidebar Slim */}
        <Sidebar.ShowSlim>
          <Sidebar.Section>
            <Avatar.Image size="sm" src={logoSrc} />
          </Sidebar.Section>
        </Sidebar.ShowSlim>
        {/* END: Sidebar Slim */}
      </React.Fragment>
    );
  }
}

export { SidebarTopA };
