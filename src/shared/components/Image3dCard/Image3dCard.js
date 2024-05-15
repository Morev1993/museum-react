import React from "react";
import {getInterpolatedValue} from "../../utils";

import './Image3dCard.scss';
import IconButtonImage from "../IconButtonImage/IconButtonImage";

export default function Image3dCard(props) {
  return <div className="image-card">
    <div className="border-image-perspective-wrapper"
         style={{
           perspective: props.perspective || 300
         }}

    >
      <div className="border-image-perspective draw"
           onClick={props.openImage}
           style={{
             transform: `rotateY(${props.yAngle || -30}deg)`,
             top: getInterpolatedValue(props.top, props.context.nHeight, props.context.height),
             left: getInterpolatedValue(props.left, props.context.nHeight, props.context.height),
             width: getInterpolatedValue(props.width, props.context.nHeight, props.context.height),
             height: getInterpolatedValue(props.height, props.context.nHeight, props.context.height),
           }}/>
    </div>
    <div>
      <IconButtonImage/>
    </div>
  </div>
}
