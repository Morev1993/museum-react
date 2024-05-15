import React, {Component} from "react";
import './ExpoMark.scss';
import {Link} from "react-router-dom";
import {rInterval, getInterpolatedValue} from '../../../shared/utils';


export default class ExpoMark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      isAnimating: false,
    };

    this.afterHoverEnter = this.afterHoverEnter.bind(this);
    this.afterHoverLeave = this.afterHoverLeave.bind(this);
    this.onClickMark = this.onClickMark.bind(this);

    this.interval = null;
  }

  componentDidMount() {
    this.startAnimTimer();
  }

  componentWillUnmount() {
    this.interval.clear();
  }

  startAnimTimer() {
    this.interval = rInterval(this.animate.bind(this), this.props.data.animationDelay);

  }

  afterHoverEnter(data) {
    this.setState({
      active: true,
    });

    this.props.getHovered(data);
  }

  afterHoverLeave() {
    this.setState({
      active: false,
    })
  }

  onClickMark() {
    this.props.onClickMark(this.props.data);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.isAnimationFinished) {
      this.interval.clear();
      this.interval = rInterval(this.animate.bind(this), this.props.data.animationDelay);
    }
  }

  animate() {
    this.interval.clear();

    this.setState({
      isAnimating: true,
    });

    const {id} = this.props.data;

    this.props.markAnimation({
      [id]: this.state.isAnimating
    });

    setTimeout(() => {
      this.setState({
        isAnimating: false,
      });

    }, 200);
  }

  render() {
    const me = this;

    const {width, height, nHeight, nWidth} = me.props.containerData;

    const {id} = me.props.data;
    const {top, left} = me.props.data.position;

    const url = require(`assets/images/icons-sprites/${id}.png`);

    return <Link to={`/expo/${id}`} className={`expo-mark ${this.state.isAnimating ? 'slideUp' : ''}`}
                 data-tip
                 data-for={'mark'}
                 onClick={this.onClickMark}
                 onMouseEnter={this.afterHoverEnter.bind(me, me.props.data)}
                 onMouseLeave={this.afterHoverLeave}
                 style={{ top: getInterpolatedValue(top, nHeight, height),
                   left: getInterpolatedValue(left, nWidth, width),
                   backgroundImage: `url(${url})`
                 }}
    />;
  }

}
