import React from "react";
import IconButton from "../IconButton/IconButton";

export default function IconButtonImage(props) {
  const icon = require(`assets/images/btns-sprite/ic-zoom.png`);
  return (
    <IconButton icon={icon} size={props.size}/>
  )
}
