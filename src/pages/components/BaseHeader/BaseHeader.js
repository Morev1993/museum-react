import {Link} from "react-router-dom";
import React from "react";
import logo from "assets/images/logo/logo-group-small.png";

import "./BaseHeader.scss";

export default function BaseHeader(props) {
  return (
    <div className="base-header">
      <Link to={props.logoUrl} className="logo">
        <img src={logo} alt=""/>
      </Link>
      {props.children}
    </div>
  )
}
