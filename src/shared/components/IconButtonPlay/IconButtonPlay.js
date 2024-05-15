import React from "react";
import IconButton from "../IconButton/IconButton";

export default function IconButtonPlay(props) {
  const icon = require(`assets/images/btns-sprite/video-play.png`);
  return (
    <IconButton icon={icon} size={props.size}/>
  )
}
