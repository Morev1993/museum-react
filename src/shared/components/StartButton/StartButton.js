import {Link} from "react-router-dom";
import React from "react";

import "./StartButton.scss";

export default function StartButton(props) {
  return <Link className="start-button" to={props.url}>
    <div className="start-button-link-wrapper">
      <span>Начать экскурсию</span>
    </div>
    <div>
      <div className="start-button-icon"/>
    </div>
  </Link>
}
