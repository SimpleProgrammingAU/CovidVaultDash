import React from "react";
import { Link } from "react-router-dom";

import { EmptyLayout } from "./../../../components";

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

const ComingSoon = () => (
  <EmptyLayout>
    <EmptyLayout.Section center>
      {/* START Header */}
      <HeaderAuth
        title="Coming Soon"
        icon="clock-o"
        text="This part of the application is actively under development. Please check back soon."
      />
      {/* END Header */}
      {/* START Bottom Links */}
      <div className="d-flex mb-5">
        <Link to="/" className="text-decoration-none">
          <i className="fa fa-angle-left mr-2" /> Back to Home
        </Link>
        <Link to="/" className="ml-auto text-decoration-none">
          Contact
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterAuth />
      {/* END Footer */}
    </EmptyLayout.Section>
  </EmptyLayout>
);

export default ComingSoon;
