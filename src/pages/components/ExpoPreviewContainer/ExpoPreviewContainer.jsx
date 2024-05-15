import React, {Component} from "react";
import "./ExpoPreviewContainer.scss";
import ExpoPreview from "../ExpoPreview/ExpoPreview";
import arrowLeft from 'assets/images/arrow-left.png';
import arrowRight from 'assets/images/arrow-right.png';

import {
  Link, withRouter,
} from "react-router-dom";

import {getExpoIdParam} from "../../../shared/utils";

const classNames = require('classnames');


class ExpoPreviewContainer extends Component {
  constructor(props) {
    super(props);

    this.viewport = React.createRef();
    this.line = React.createRef();

    this.state = {
      maxY: 0,
      step: 100,
      y: 0,
      offset: 10,
      previewWidth: 120,
      previewOffset: 24,
      fullWidth: null,
    };


    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.move = this.move.bind(this);
    this.fillData = this.fillData.bind(this);
    this.onClickPreview = this.onClickPreview.bind(this);
  }

  componentDidMount() {
    this.fillData();

    window.addEventListener('resize', this.fillData);

    this.unlisten = this.props.history.listen( location =>  {
      if (location.pathname.includes('game')) {
        return;
      }

      setTimeout(() => {
        const target = this.props.state.marks.find(item => item.id === getExpoIdParam(this.props.location.pathname));

        const expoId = target && target.order;
        if (target) {
          this.showAsideItemsByClick(expoId);
        }


        this.setState({
          maxY: this.line.current.offsetWidth - this.viewport.current.offsetWidth
        });

        if (!expoId || !target) {
          this.move(this.state.offset);
        }
      }, 0);
    });

  }

  moveToActive() {
    const expoId = getExpoIdParam(this.props.location.pathname);
    const target = this.props.state.marks.find(item => item.id === getExpoIdParam(this.props.location.pathname));


    if (!expoId || !target) {
      this.move(this.state.offset);
      return;
    }

    const i = this.props.state.marks.findIndex(mark => mark.id === expoId);

    let initYByRoute = i * (this.state.previewWidth + this.state.previewOffset);

    if (Math.abs(initYByRoute) > this.state.maxY) {
      initYByRoute = this.state.maxY + this.state.offset;
    }

    if (initYByRoute === 0) {
      initYByRoute = -this.state.offset;
    }

    this.move(-initYByRoute);
  }

  componentWillUnmount() {
    this.unlisten();

    window.removeEventListener('resize', this.fillData);
  }

  fillData() {
    this.setState({
      maxY: this.line.current.offsetWidth - this.viewport.current.offsetWidth,
    }, () => {
      this.moveToActive();
    });
  }

  moveRight() {
    let y = this.state.y - this.state.step;

    if (this.isLeftFinish(y)) {
      return;
    }


    const maxY = this.state.maxY;

    if (Math.abs(y) > maxY) {
      y = -maxY - this.state.offset;
    }

    this.move(y);
  }

  moveLeft() {
    if (this.state.y === this.state.offset) {
      return;
    }

    let y = this.state.y + this.state.step;

    if (y > 0) {
      y = 0 + this.state.offset;
    }

    this.move(y);
  }

  move(y) {
    this.setState({
      y: y
    });
    this.line.current.style.transform = `translateX(${y}px)`;
  }

  isLeftFinish() {
    const max = this.state.maxY + this.state.offset;
    return Math.abs(this.state.y) === max || Math.abs(this.state.y) > max;
  }

  isRightFinish() {
    return this.state.y === this.state.offset;
  }

  onClickPreview(mark) {
    this.showAsideItemsByClick(mark.id);

    if (this.props.onClickPreview) {
      this.props.onClickPreview(mark);
    }
  }

  showAsideItemsByClick(id) {
    const index = id - 1;
    const elWidth = this.state.previewWidth + this.state.previewOffset;
    const goToPosition = index * elWidth;
    const lastViewportPosition = Math.abs(this.state.y) + this.viewport.current.offsetWidth;

    if (this.viewport.current.offsetWidth <= elWidth) {
      return;
    }

    const nextLeftPosition = this.state.y + this.state.step;
    if (goToPosition < Math.abs(this.state.y) + elWidth) {
      if (nextLeftPosition < 0) {
        this.move(nextLeftPosition);
      } else {
        this.move(this.state.offset);
      }
      return;
    }

    const nextRightPosition = this.state.y - this.state.step;
    if (goToPosition > lastViewportPosition - elWidth * 2) {
      if (Math.abs(nextRightPosition) > this.state.maxY) {
        this.move(-this.state.maxY - this.state.offset);
      } else {
        this.move(nextRightPosition);
      }

    }
  }

  render() {
    const previewClassNames = classNames({
      'preview-carousel': true,
      'not-full-right': !this.isLeftFinish(),
      'not-full-left': !this.isRightFinish(),
    });

    const expoId = getExpoIdParam(this.props.location.pathname);

    const target = this.props.state.marks.find(mark => mark.id === expoId);

    const currentPreviewImage = target && expoId && require(`assets/images/${expoId}.png`);

    return <div className={`previews-container ${expoId && target ? 'preview-container-current' : ''}`}>
      {expoId && target && <div className="current-preview">
        <Link to={'/expo'}>
          <img src={currentPreviewImage} alt=""/>
        </Link>
      </div>}
      <div className="preview-carousel-wrapper">
        <div className={"preview-arrow preview-arrow-left" + (this.isRightFinish()  ? " disabled" : '')}
             onClick={this.moveLeft}>
          <img src={arrowLeft} alt=""/>
        </div>
        <div className="preview-carousel-inner">
          <div className={previewClassNames} ref={this.viewport} >
            <div className="expo-previews" ref={this.line}>

              {this.props.state.marks.map(mark => {
                return <ExpoPreview
                  key={mark.id}
                  onClickPreview={this.onClickPreview}
                  data={mark}
                />
              })}
            </div>
          </div>
        </div>
        <div className={"preview-arrow preview-arrow-right" + (this.isLeftFinish() ? " disabled" : '')}
             onClick={this.moveRight}>
          <img src={arrowRight} alt=""/>

        </div>
      </div>

    </div>;
  }
}

export default withRouter(ExpoPreviewContainer);
