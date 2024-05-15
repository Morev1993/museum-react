import {Link} from "react-router-dom";
import React from "react";

import "./GoButton.scss";

export default function GoButton(props) {
  const {prevId, nextId} = props;

  return <div className="go-button-wrapper">
    {prevId && <div className="go-button go-button-back">
      <Link to={`/expo/${prevId}/`}>
        <span className={'go-button-icon'}/>
        <span>Вернуться обратно</span>
      </Link>
    </div>}
    {nextId && <div className="go-button">
      <Link to={`/expo/${nextId}/`}>
        <span>Продолжить экскурсию</span>
        <span className={'go-button-icon'}/>
      </Link>
    </div>}
    {!nextId && <div className="go-button">
      <Link to={`/expo/`}>
        <span className="go-button-text">Вернуться на главную</span>
        <span className={'go-button-icon'}/>
      </Link>
    </div>}
  </div>
}
