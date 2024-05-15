import React from "react";
import IconButton from "../IconButton/IconButton";

export default function IconButtonLink(props) {
  const icon = require(`assets/images/btns-sprite/out.png`);
  return (
    <IconButton icon={icon} size={props.size}/>
  )
}
