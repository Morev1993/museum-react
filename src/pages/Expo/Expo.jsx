import React, { Component } from 'react';
import renderBg from "assets/images/z00.jpg";
import './Expo.scss';
import ExpoMark from "../components/ExpoMark/ExpoMark";
import {calculateAspectRatioFit} from "../../shared/utils";

import BaseHeader from "../components/BaseHeader/BaseHeader";
import ExpoTooltip from "../../shared/components/ExpoTooltip/ExpoTooltip";
import ExpoGuide from "../components/ExpoGuide/ExpoGuide";
import StartButton from "../../shared/components/StartButton/StartButton";
import DynamicPosition from "../../shared/components/DynamicPosition/DynamicPosition";

import patternLeft from "assets/images/pattern2.png";
import patternRight from "assets/images/pattern1.png";
import icSmile from "assets/images/icons/ic-smile.png";


const FOOTER_HEIGHT = 136;

export default class Expo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgLoading: false,
      hoveredMark: {},
      isAnimationFinished: false,
      marks: [],
      bg: {
        nWidth: null,
        bHeight: null,
        width: null,
        height: null,
      },
    };

    this.marks = [];

    this.imageBg = React.createRef();
    this.saveImageData = this.saveImageData.bind(this);
    this.onLoadImage = this.onLoadImage.bind(this);
    this.getHovered = this.getHovered.bind(this);
    this.handleMarkAnimation = this.handleMarkAnimation.bind(this);
  }

  componentDidMount() {
    this.setState({bgLoading: true});

    window.addEventListener('resize', this.saveImageData);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveImageData);
  }

  saveImageData() {
    const image = this.imageBg.current;

    const sizeData = calculateAspectRatioFit(image.clientWidth,
      image.clientHeight,
      window.innerWidth,
      window.innerHeight - FOOTER_HEIGHT);

    this.setState({
      bg: {
        nWidth: image.naturalWidth,
        nHeight: image.naturalHeight,
        width: sizeData.width,
        height: sizeData.height,
      }
    });
  }

  openDetails(mark) {
    this.props.openDetails(mark);
  }


  onLoadImage() {
    this.setState({bgLoading: false});

    this.saveImageData();
  }

  getHovered(data) {
    this.setState({
      hoveredMark: data
    })
  }

  handleMarkAnimation(value) {
    this.marks.push(value);

    if (this.marks.length  === this.props.state.marks.length) {
      this.marks = [];
      this.setState({
        isAnimationFinished: true
      });
    }
  }

  onStartButtonClick() {
    this.openDetails(this.props.state.marks[0]);
  }


  render() {
    const me = this;
    const {name, heading, description} = this.state.hoveredMark;

    const audio = require(`assets/audio/z0.mp3`);

    return <div className={"expo container" + (this.state.bgLoading ? " loading" : '')}>
      <BaseHeader logoUrl={""}>
        <div className="expo-info-align">
          <div className="expo-info">
            <div className="expo-info-image">
              <img src={icSmile} alt=""/>
            </div>
            <div>
              Начните знакомство с нашим Мультимедийным центром активировав аудиогида, затем нажмите "Начать экскурсию".
            </div>
          </div>
        </div>
      </BaseHeader>
      <div className="expo-info-wrapper">
        <ExpoGuide url={audio}/>
      </div>

      <div className="expo-content">
        <div className="expo-pattern pattern-left" style={{
          backgroundImage: 'url(' + patternLeft + ')'
        }}/>
        <div className="expo-bg">
          <img src={renderBg}
               alt="museum"
               ref={this.imageBg}
               style={{width: this.state.bg.width, height: this.state.bg.height}}
               onLoad={this.onLoadImage}/>
          <div className="expo-marks">
            {this.props.state.marks.map(mark => {
              return <ExpoMark
                key={mark.id}
                data={mark}
                isAnimationFinished={this.state.isAnimationFinished}
                markAnimation={this.handleMarkAnimation}
                onClickMark={me.openDetails.bind(me, mark)}
                getHovered={this.getHovered}
                containerData={this.state.bg}
              />
            })}
          </div>

          <ExpoTooltip id={'mark'} name={name} heading={heading} description={description}/>
          <DynamicPosition
            top={2400}
            left={2300}
            context={this.state.bg}>
            <div onClick={this.onStartButtonClick.bind(me)}>
              <StartButton url="/expo/welcome_area"/>
            </div>
          </DynamicPosition>

        </div>
        <div className="expo-pattern pattern-right" style={{
          backgroundImage: 'url(' + patternRight + ')'
        }}/>
      </div>
      <div className="expo-info-align-mobile">
        <div className="expo-guide-mobile">
          <ExpoGuide url={audio}/>
        </div>
        <div className="expo-info">
          <div className="expo-info-image">
            <img src={icSmile} alt=""/>
          </div>
          <div>
            Начните знакомство с нашим Мультимедийным центром активировав аудиогида, затем нажмите "Начать экскурсию".
          </div>
        </div>
      </div>
      <div className="expo-info-mobile">
        <StartButton url="/expo/welcome_area"/>
      </div>
    </div>;
  }

}
