import React, {Component} from 'react';
import Expo from './pages/Expo/Expo'
import './Main.scss';
import {
  Switch,
  Route, withRouter,
} from "react-router-dom";
import GameView from "./pages/Expo/GameView/GameView";
import Intro from "./pages/Intro/Intro";
import ExpoDetails from "./pages/Expo/ExpoDetails/ExpoDetails";
import ExpoDetailsMobile from "./pages/Expo/ExpoDetailsMobile/ExpoDetailsMobile";
import ExpoPreviewContainer from "./pages/components/ExpoPreviewContainer/ExpoPreviewContainer";

import {getExpoIdParam, isMobile} from "./shared/utils";
import NotFound from "./pages/components/NotFound/NotFound";
import {zoneIds} from "./constants/options";


class Main extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      selectedMark: {},
      isLoading: false,
      marks: [],
      defaultMarks: []
    };

    this.openDetails = this.openDetails.bind(this);
  }

  async loadData() {
    const data = await fetch('/expo.json');
    const EXPO = await data.json();

    const marks = [...EXPO];

    this.updateMarks(marks);
    this.setState({
      defaultMarks: this.state.marks
    });

    this.filterMarksForMobile();
    this.updateMarks();

    this.forceUpdate();
  }

  updateMarks(marks = this.state.marks) {
    const newMarks = marks.map((item, i) => {
      const id = i + 1;
      const number = id < 10 ? `0${id}` : id;

      item.number = number;
      item.order = id;
      item.name = `Зона ${number}`;
      item.miniExpoIcon = require(`assets/images/icons/mini-expo-icons/${item.id}.png`);
      item.audio = require(`assets/audio/${item.id}.mp3`);

      if (id > 1 && id < marks.length) {
        item.prevId = marks[i - 1].id;
        item.nextId = marks[i + 1].id;
      }

      if (id === marks.length) {
        item.prevId = marks[i - 1].id;
      }
      if (id === 1) {
        item.nextId = marks[i + 1].id;
      }

      return item;
    });

    this.setState({
      marks: newMarks,
    });
  }

  filterMarksForMobile() {
    if (isMobile()) {
      this.setState({
        marks: this.state.defaultMarks.filter((mark) => mark.id !== zoneIds.z_9)
      });
    } else {
      this.setState({
        marks: this.state.defaultMarks
      });
    }
  }

  componentDidMount() {
    this.loadData();

    window.addEventListener('resize', () => {
      this.filterMarksForMobile();
      this.updateMarks();
      this.forceUpdate();
    });

    const expoId = getExpoIdParam(this.props.location.pathname);

    if (expoId) {
      const target = this.state.marks.find(mark => mark.id === expoId);

      if (!target) {
        return;
      }

      this.setState({
        selectedMark: target
      })
    }
  }

  componentWillUnmount() {
  }

  openDetails(mark) {
    this.setState({
      selectedMark: mark
    });
  }

  renderDetails() {
    const expoId = getExpoIdParam(this.props.location.pathname);

    const target = this.state.marks.find(mark => mark.id === expoId);

    if (!target) {
      return <NotFound/>;
    }

    if (!isMobile()) {
      return <ExpoDetails data={this.state.marks}/>;
    } else {
      return <ExpoDetailsMobile data={this.state.marks}/>;
    }

  }

  render() {
    const isGamePage = this.props.location.pathname.includes('game');
    return (
      <div>
        <div className={`main-content ${isGamePage ? 'no-footer': ''}`} >
          <Switch>
            <Route exact path="/">
              <Intro/>
            </Route>
            <Route exact path="/expo">
              <Expo state={this.state} openDetails={this.openDetails}/>
            </Route>
            <Route exact path="/expo/:expoId">
              {this.state.marks.length && this.renderDetails()}
            </Route>
            <Route path="/expo/:expoId/game/:gameId">
              <GameView />
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        {!isGamePage && <div className="expo-footer container">
          {this.state.marks.length && <ExpoPreviewContainer state={this.state} onClickPreview={this.openDetails}/>}
        </div>}
      </div>
    );
  }
}

export default withRouter(Main);
