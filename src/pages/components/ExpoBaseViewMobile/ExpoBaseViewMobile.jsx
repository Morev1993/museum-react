import React, {Component} from "react";
import ExpoGuide from "../ExpoGuide/ExpoGuide";

import "./ExpoBaseViewMobile.scss";
import GoButton from "../GoButton/GoButton";

export class ExpoBaseViewMobile extends Component {
  render() {
    const {heading, description, audio, prevId, nextId} = this.props.data;

    return <div className={`expo-mobile-view`}>
      <div className={`expo-mobile-top`}>
        <h1>{heading}</h1>
        <p className="expo-description">{description}</p>
        {this.props.extra}
      </div>
      <div className="expo-bottom">
        <ExpoGuide url={audio}
                   isAudioStopping={!this.props.isAudioPlaying}
                   onAudioFinished={this.props.onAudioFinished}/>
        <div>
          {this.props.controls}
        </div>
      </div>
      <GoButton prevId={prevId} nextId={nextId}/>
    </div>
  }
}
