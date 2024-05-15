import React, {Component} from "react";
import Iframe from 'react-iframe';
import {Link, withRouter} from "react-router-dom";
import gameIcon from 'assets/images/icons/mini-expo-icons/thermal_safety.png';
import goBackImage from 'assets/images/icons/go-back-left.png';


import "./GameView.scss";
import BaseHeader from "../../components/BaseHeader/BaseHeader";
import {getGameIdParam} from "../../../shared/utils";

const gameIds = {
  PIPES: 'pipes',
  MARIO: 'mario',
  VICTORY: 'victory',
};

class GameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frameWidth: '100%',
      frameHeight: '800px',
      host: '',
      isShowed: true,
    };

    this.showGame = this.showGame.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      isShowed: false,
    })
  }

  showGame() {
    this.setState({
      isShowed: true,
    })
  }

  renderHeading(id) {
    if (id === gameIds.PIPES) {
      return 'Поверни трубу';
    }

    if (id === gameIds.MARIO) {
      return 'Энергобезопасные приключения';
    }

    if (id === gameIds.VICTORY) {
      return 'Викторина';
    }

    return 'Нет такой игры';
  }

  renderGame(id) {
    if (!this.state.isShowed) {
      return null;
    }
    if (id === gameIds.PIPES) {
      return <Iframe url={``}
                     width={this.state.frameWidth}
                     height={this.state.frameHeight}/>;
    }

    if (id === gameIds.MARIO) {
      return <Iframe url={``}
                     width={this.state.frameWidth}
                     height={this.state.frameHeight}/>;
    }

    if (id === gameIds.VICTORY) {
      return <Iframe url={``}
                     width={this.state.frameWidth}
                     height={this.state.frameHeight}/>;
    }

    return null;
  }

  render() {

    const gameId = getGameIdParam(this.props.location.pathname);

    return <div className="game-view">
      <div className="container">
        <div className="game-header">
          <BaseHeader logoUrl={"/expo"}>
            <div className="game-icon-wrapper">
              <img src={gameIcon} alt="" className="game-icon"/>
            </div>
            <h2>{this.renderHeading(gameId)}</h2>
          </BaseHeader>
        </div>
        <div className={`game-content ${this.state.isShowed ? 'game-showed' : ''}`}>
          {this.renderGame(gameId)}
        </div>
        {/*<div className="game-play">*/}
        {/*  <div className="go-back" onClick={this.showGame}>*/}
        {/*    Запустить*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="back-wrapper">
          <Link to="../" className="go-back">
            <img src={goBackImage} alt=""/>
            Вернуться в музей
          </Link>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(GameView);
