import React from "react";
import IconButton from "../IconButton/IconButton";

export default function IconButtonGame(props) {
  const icon = require(`assets/images/btns-sprite/play.png`);
  return (
    <IconButton icon={icon} size={props.size}/>
  )
}
