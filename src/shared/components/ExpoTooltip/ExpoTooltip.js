import ReactTooltip from "react-tooltip";
import React from "react";

import "./ExpoTooltip.scss";

export default function ExpoTooltip(props) {
  const {id, name, heading, description, place} = props;
  return <ReactTooltip backgroundColor='rgba(255, 255, 255, 0.8)'
                       textColor="black"
                       effect='solid'
                       place={place || 'top'}
                       resizeHide={true}
                       className='expo-tooltip'
                       globalEventOff='click'
                       id={id}>
    {name && <div className="expo-tooltip-name">{name}</div>}
    {heading && <div className="expo-tooltip-heading">{heading}</div>}
    {description && <div className="expo-tooltip-text" dangerouslySetInnerHTML={{
      __html: description
    }}/>}
  </ReactTooltip>
}
