import React from "react";
import {getInterpolatedValue} from "../../utils";

import './DynamicPosition.scss';

export default function DynamicPosition(props) {

  function getLeft() {
    if (props.fixedLeft) {
      return props.fixedLeft;
    }
    const iValue = getInterpolatedValue(props.left, props.context.nWidth, props.context.width);
    if (iValue) {
      if (!props.context.left) {
        return iValue;
      } else {
        return  iValue + props.context.left;
      }
    }

    return 'auto';
  }

  return <div className={'dynamic-position'}
    style={{
      top: getInterpolatedValue(props.top, props.context.nHeight, props.context.height),
      left: getLeft(),
      right: props.fixedRight,
    }}>
    {props.children}
  </div>
}
