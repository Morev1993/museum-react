import React, {Component} from "react";
import './ExpoGuide.scss';

import ReactAudioPlayer from 'react-audio-player';


import {withRouter} from "react-router-dom";
const classNames = require('classnames');

class ExpoGuide extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isAudioPlaying: false,
      isAudioStopping: false,
    };

    this.toggleAudio = this.toggleAudio.bind(this);

    this.onAudioFinished = this.onAudioFinished.bind(this);
    this.onAbort = this.onAbort.bind(this);
    this.onCanPlay = this.onCanPlay.bind(this);
  }

  onAudioFinished() {
    if (this.props.onAudioFinished) {
      this.props.onAudioFinished();
    }
  }

  onCanPlay(event) {
    if (this.props.autoPlay) {
      this.startAudio();
      event.target.play();
    }
  }

  onAbort() {
    this.stopAudio();
  }

  startAudio() {
    this.setState({ isAudioPlaying: true });
  }

  stopAudio() {
    this.setState({ isAudioPlaying: false });
  }

  componentWillReceiveProps(nextProps) {
    const el = this.audio.audioEl.current;

    if (nextProps.isAudioStopping) {
      el.pause();
      this.stopAudio();
    }
  }

  toggleAudio() {
    const el = this.audio.audioEl.current;

    this.setState({
      isAudioPlaying: !this.state.isAudioPlaying,
    },() => {
      this.state.isAudioPlaying ? el.play() : el.pause();
    });
  }


  render() {
    const url = this.props.url;
    const soundWaveIcon = require(`assets/images/soundwave.gif`);
    const soundPicture = require(`assets/images/guide-thumb.png`);


    const guideClassNames = classNames({
      'expo-guide': true,
      'active': this.state.isAudioPlaying,
    });

    return <div className="expo-guide-wrapper">
      <img src={soundPicture || ''} className="expo-guide-picture" alt=""/>
      <div className={guideClassNames} onClick={this.toggleAudio}>
        <div className="soundwave-container">
          <img className="soundwave" src={soundWaveIcon || ''} alt=""/>
          <ReactAudioPlayer
            onCanPlayThrough={this.onCanPlay}
            onAbort={this.onAbort}
            onEnded={this.onAudioFinished}
            src={url}
            ref={(element) => { this.audio = element; }}
          />
        </div>
      </div>
    </div>;
  }
}

export default withRouter(ExpoGuide);
