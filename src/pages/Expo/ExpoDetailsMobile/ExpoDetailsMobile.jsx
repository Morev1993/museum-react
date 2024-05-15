import React, {Component} from "react";
import './ExpoDetailsMobile.scss';
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube';
import BaseHeader from "../../components/BaseHeader/BaseHeader";
import {ExpoBaseViewMobile} from "../../components/ExpoBaseViewMobile/ExpoBaseViewMobile";
import IconButtonPlay from "../../../shared/components/IconButtonPlay/IconButtonPlay";
import IconButtonLink from "../../../shared/components/IconButtonLink/IconButtonLink";
import IconButtonImage from "../../../shared/components/IconButtonImage/IconButtonImage";


import imageLeft from "../../../assets/images/walls-left.jpg";
import imageHotLost from "../../../assets/images/hot-lost.jpg";
import imageRight from "../../../assets/images/walls-right.jpg";


import {
  withRouter,
} from "react-router-dom";
import {getExpoIdParam} from "../../../shared/utils";
import {VIDEO_OPTIONS, zoneIds} from "../../../constants/options";


ReactModal.setAppElement('#modal');

class ExpoDetailsMobile extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      canAudioPlay: true,
      isVideoPlaying: false,
      isShowedVideoModal: false,
      isShowedImageModal: false,
      data: {},
    };

    this.handleOpenVideo = this.handleOpenVideo.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.openImage = this.openImage.bind(this);
    this.handleOpenMultipleVideo = this.handleOpenMultipleVideo.bind(this);
  }

  handleOpenVideo() {
    this.setState({
      isShowedVideoModal: !!this.state.videoId || !!this.state.data.videoId,
      canAudioPlay: false,
    });
  }

  handleOpenMultipleVideo() {
    this.openVideoItem('4GihG3Gr1X4');
  }

  openImage(image) {
    this.setState({
      isShowedImageModal: true,
      canAudioPlay: false,
      image,
    });
  }

  handleCloseModal () {
    this.setState({ isShowedVideoModal: false, isShowedImageModal: false, canAudioPlay: true, videoId: null });
  }

  componentDidMount() {
    const expoId = getExpoIdParam(this.props.location.pathname);
    this.setDetails(expoId);

    this.unlisten = this.props.history.listen((location) => {
      const id = getExpoIdParam(location.pathname);
      this.setDetails(id);
    });
  }

  setDetails(id) {
    this.setState({
      data: this.props.data.find(mark => mark.id === id)
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();

    }
  }

  openVideoItem(videoId) {
    this.setState({
      videoId
    }, () => {
      this.handleOpenVideo();
    });

  }

  renderViews(id) {
    const me = this;

    switch(id) {
      case zoneIds.z_1:
        return <ExpoBaseViewMobile
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          controls={
            <div className={"expo-controls"}>
              <div onClick={this.openImage.bind(me, imageLeft)} className="expo-control">
                <IconButtonImage size={64}/>
                <span>Инфографика 1</span>
              </div>
              <div onClick={this.openImage.bind(me, imageRight)} className="expo-control">
                <IconButtonImage size={64}/>
                <span>Инфографика 2</span>
              </div>
              <div onClick={this.handleOpenVideo} className="expo-control">
                <IconButtonPlay size={64}/>
                <span>Видео</span>
              </div>
            </div>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_5:
        return <ExpoBaseViewMobile
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          extra={
            <div className="expo-description-extra">
              <div>
                <b>Что делать при аварии?</b>
              </div>
              <ul>
                <li>
                  Покиньте опасную зону. Если это невозможно, поднимитесь на возвышенность
                </li>
                <li>
                  Предупредите об опасности окружающих
                </li>
                <li>
                  Не пытайтесь справиться с утечкой самостоятельно
                </li>
                <li>
                  Позвоните в экстренную службу 112
                </li>
              </ul>
              <br/>
              <div>
                В постоянной готовности находится <b>35 аварийных бригад</b> ПАО «Т Плюс»
              </div>
            </div>
          }
          controls={
            <div className={"expo-controls"}>
              <div onClick={this.handleOpenVideo} className="expo-control">
                <IconButtonPlay size={64}/>
                <span>Видео</span>
              </div>
            </div>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_7:
        return <ExpoBaseViewMobile
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          controls={
            <div className={"expo-controls"}>
              <div onClick={this.openImage.bind(me, imageHotLost)} className="expo-control">
                <IconButtonImage size={64}/>
                <span>Инфографика 1</span>
              </div>
              <div onClick={this.handleOpenVideo} className="expo-control">
                <IconButtonPlay size={64}/>
                <span>Видео</span>
              </div>
            </div>

          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_9:
        return <ExpoBaseViewMobile
          data={this.state.data}
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_10:
        return <ExpoBaseViewMobile
          data={this.state.data}
          controls={
            <div className={"expo-controls"}>
              <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[0])} className="expo-control">
                <IconButtonPlay size={64}/>
                <span>Почему происходят аварии на теплотрассах? Основные причины.</span>
              </div>
              <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[1])} className="expo-control">
                <IconButtonPlay size={64}/>
                <span>Летние отключения горячей воды. Все, что вы хотели узнать, но боялись спросить.</span>
              </div>
              <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[2])} className="expo-control">
                <IconButtonPlay size={64}/>
                <span>Куда «идут» деньги за отопление? Давайте разберемся!</span>
              </div>
              <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[3])} className="expo-control">
                <IconButtonPlay size={64}/>
                <span>Сколько платят за отопление в Европе и России?</span>
              </div>
            </div>
          }
          onAudioFinished={this.handleOpenMultipleVideo}
        />;
      case zoneIds.z_11:
        return <ExpoBaseViewMobile
          data={this.state.data}
          controls={
            <div className={"expo-controls"}>
              <div className="expo-control">
                <a href={this.state.data.link} target="_blank" rel='noreferrer noopener'>
                  <IconButtonLink size={64}/>
                </a>
                <span>Ссылка</span>
              </div>
            </div>

          }
          onAudioFinished={this.handleOpenVideo}
        />;
      default:
        return <ExpoBaseViewMobile
        data={this.state.data}
        isAudioPlaying={this.state.canAudioPlay}
        controls={
          <div className={"expo-controls"}>
            <div onClick={this.handleOpenVideo} className="expo-control">
              <IconButtonPlay size={64}/>
              <span>Видео</span>
            </div>
          </div>
        }
        onAudioFinished={this.handleOpenVideo}
      />;
    }
  }

  render() {
    const {miniExpoIcon, id} = this.state.data;

    const bg = id ? require(`assets/images/zones/${id}.jpg`) : '';

    return <div className={`expo-details-mobile`}
    >
      <div>
        <div className="expo-mobile-image">
          <img src={bg} alt=""
               className={'expo-details-bg'}/>
          <div className="expo-overlay"/>
        </div>
        <div className="container">
          <div className="expo-header-mobile">
            <BaseHeader logoUrl={"/expo"}/>
          </div>
          <div className="expo-mobile-content">
            <div className="expo-icon expo-icon-mobile">
              <img src={miniExpoIcon} alt=""/>
            </div>
            {this.renderViews(id)}
          </div>


          <ReactModal
            isOpen={this.state.isShowedVideoModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-close" onClick={this.handleCloseModal}/>

            <div className="video-frame-container">
              <YouTube video={this.state.videoId || this.state.data.videoId}
                       autoplay
                       opts={VIDEO_OPTIONS}
                       onEnd={this.handleCloseModal}
                       className={'video-frame'} />
            </div>
          </ReactModal>
        </div>
      </div>

      <div className={`image-curtain ${this.state.isShowedImageModal ? 'showed' : ''}`}>
        <div className="modal-close" onClick={this.handleCloseModal}/>

        <div className="image-curtain-content image-modal-content" style={{
          background: 'black url(' + this.state.image + ') no-repeat center center'
        }}/>
      </div>
    </div>;
  }
}

export default withRouter(ExpoDetailsMobile);
