import React, {Component} from "react";
import ExpoGuide from "../ExpoGuide/ExpoGuide";
import GoButton from "../../components/GoButton/GoButton";

import "./ExpoBaseView.scss";

export class ExpoBaseView extends Component {
  render() {
    const {heading, description, audio, nextId, prevId} = this.props.data;

    return <div className={`expo-details-content`}>
      <div className={`d-flex expo-top`}>
        <div className="expo-top-left">
          <h1>{heading}</h1>
          <p className="expo-description">{description}</p>
        </div>
        <div className="expo-top-right">
          {this.props.link}
          {this.props.topRight}
        </div>
      </div>
      {this.props.center}
      <div className="expo-bottom">
        <div className="expo-bottom-left">
          <ExpoGuide url={audio}
                     isAudioStopping={!this.props.isAudioPlaying}
                     onAudioFinished={this.props.onAudioFinished}/>
          {this.props.video}
        </div>
        {this.props.bottomRight}
      </div>
      <GoButton prevId={prevId} nextId={nextId}/>
    </div>
  }
}
