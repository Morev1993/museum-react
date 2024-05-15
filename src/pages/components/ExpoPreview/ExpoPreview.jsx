import React from 'react';
import "./ExpoPreview.scss";
import {Link, withRouter} from "react-router-dom";
import {getExpoIdParam} from "../../../shared/utils";
const classNames = require('classnames');

function ExpoPreview(props) {
  const {number, heading, id} = props.data;
  const url = require(`assets/images/${id}-prew.png`);
  const paramId = getExpoIdParam(props.location.pathname);

  const previewClassNames = classNames({
    'expo-preview': true,
    'active': paramId === id,
  });

  function openPreview(data) {
    props.onClickPreview(data);
  }
  return <Link className={previewClassNames}
               to={'/expo/' + id}
               onClick={openPreview.bind(null, props.data)}
  >
    <div>
      <img src={url} draggable={false} alt=""/>
    </div>
    <div className="expo-preview-overlay">
      <div className="preview-number">{number}</div>
      <div className="preview-name">{heading}</div>
    </div>
  </Link>;
}

export default withRouter(ExpoPreview);
