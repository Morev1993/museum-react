import React, {Component} from "react";

import "./IconButton.scss";

export default class IconButton extends Component{
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.icon,
      isHovered: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter() {
    this.setState({
      isHovered: true,
    })
  }

  onMouseLeave() {
    this.setState({
      isHovered: false,
    })
  }

  render() {
    const size = this.props.size || 80;
    return (
      <div className="icon-button"
           onMouseEnter={this.onMouseEnter}
           onMouseLeave={this.onMouseLeave}
           style={{
             width: size,
             minWidth: size,
             height: size,
             backgroundImage: `url(${this.state.url})`,
             backgroundPositionY: this.state.isHovered ? -size : 0
           }}/>
    )
  }
}
