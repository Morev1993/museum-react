import React, {Component} from "react";
import './ExpoDetails.scss';
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube';
import BaseHeader from "../../components/BaseHeader/BaseHeader";
import {ExpoBaseView} from "../../components/ExpoBaseView/ExpoBaseView";
import IconButtonPlay from "../../../shared/components/IconButtonPlay/IconButtonPlay";
import IconButtonGame from "../../../shared/components/IconButtonGame/IconButtonGame";
import ExpoTooltip from "../../../shared/components/ExpoTooltip/ExpoTooltip";
import IconButtonLink from "../../../shared/components/IconButtonLink/IconButtonLink";
import DynamicPosition from "../../../shared/components/DynamicPosition/DynamicPosition";
import Image3dCard from "../../../shared/components/Image3dCard/Image3dCard";

import imageLeft from "../../../assets/images/walls-left.jpg";
import imageHotLost from "../../../assets/images/hot-lost.jpg";
import imageRight from "../../../assets/images/walls-right.jpg";
import {cover} from 'intrinsic-scale';
import {VIDEO_OPTIONS, zoneIds} from "../../../constants/options";

import {
  Link,
  withRouter,
} from "react-router-dom";

import {getExpoIdParam} from "../../../shared/utils";
const classNames = require('classnames');

ReactModal.setAppElement('#modal');

class ExpoDetails extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      canAudioPlay: true,
      isVideoPlaying: false,
      isShowedVideoModal: false,
      isShowedImageModal: false,
      data: {},
      bg: {
        nWidth: null,
        bHeight: null,
        width: null,
        height: null,
      },
    };

    this.imageBg = React.createRef();
    this.imageWrapper = React.createRef();
    this.handleOpenVideo = this.handleOpenVideo.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onLoadImage = this.onLoadImage.bind(this);
    this.saveImageData = this.saveImageData.bind(this);
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
    window.addEventListener('resize', this.saveImageData);

    const expoId = getExpoIdParam(this.props.location.pathname);
    this.setDetails(expoId);

    this.unlisten = this.props.history.listen((location) => {
      const id = getExpoIdParam(location.pathname);
      this.setDetails(id);
    });
  }

  setDetails(id) {
    this.setState({
      bgLoading: true,
      data: this.props.data.find(mark => mark.id === id)
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveImageData);

    if (this.unlisten) {
      this.unlisten();
    }
  }

  openVideoItem(videoId) {
    this.setState({
      videoId
    });

    this.handleOpenVideo();
  }

  saveImageData() {
    const image = this.imageBg.current;

    let imageWidth = this.imageWrapper.current.clientWidth;
    let imageHeight = this.imageWrapper.current.clientHeight;

    const result = cover(imageWidth, imageHeight, image.clientWidth, image.clientHeight);

    this.setState({
      bg: {
        nWidth: image.naturalWidth,
        nHeight: image.naturalHeight,
        width: result.width,
        height: result.height,
        left: result.x
      }
    });
  }

  renderViews(id) {
    const me = this;

    switch(id) {
      case zoneIds.z_1:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          video={
            <DynamicPosition
              top={630}
              left={730}
              context={this.state.bg}>
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>

          }
          center={
            <div>
              <DynamicPosition
                top={400}
                left={300}
                context={this.state.bg}>
                <div onClick={this.openImage.bind(me, imageLeft)}>
                  <Image3dCard
                    perspective={500}
                    yAngle={40}
                    top={-200} left={-180} width={350} height={300} context={this.state.bg}
                  />
                </div>
              </DynamicPosition>
              <DynamicPosition
                top={400}
                left={730}
                context={this.state.bg}>
                <Link to={`/expo/${id}/game/pipes`}>
                  <div data-tip
                       data-for={'pipes'}>
                    <IconButtonGame size={96}/>
                  </div>
                  <ExpoTooltip id={'pipes'}
                               place={'right'}
                               description={'Игра <b>Поверни трубу.</b> Это увлекательная игра. Соедините трубы, чтобы горячая вода не «ушла» под землю, а попала в систему отопления микрорайона. Торопитесь – время ограниченно.'}
                  />
                </Link>
              </DynamicPosition>
              <DynamicPosition
                top={400}
                left={1250}
                context={this.state.bg}
              >
                <div onClick={this.openImage.bind(me, imageRight)}>
                  <Image3dCard top={-150} left={-160} width={320} height={280} context={this.state.bg}
                  />
                </div>
              </DynamicPosition>
            </div>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_2:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          video={
            <DynamicPosition
              top={340}
              left={750}
              context={this.state.bg}
            >
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_3:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          video={
            <DynamicPosition
              top={530}
              left={800}
              context={this.state.bg}
            >
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_4:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          video={
            <DynamicPosition
              top={520}
              left={680}
              context={this.state.bg}
            >
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_5:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          topRight={
            <div>
              <DynamicPosition
                top={350}
                left={1050}
                context={this.state.bg}
              >
                <div className="expo-description-extra expo-description-fixed">
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
              </DynamicPosition>
            </div>
          }
          video={
            <DynamicPosition
              top={650}
              left={770}
              context={this.state.bg}
            >
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_6:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          video={
            <DynamicPosition
              top={530}
              left={650}
              context={this.state.bg}
            >
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_7:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          center={
            <DynamicPosition
            top={450}
            left={720}
            context={this.state.bg}
            >
              <div onClick={this.openImage.bind(me, imageHotLost)}>
                <Image3dCard top={-35} left={-40} width={160} height={144} context={this.state.bg}
                             yAngle={5}
              />
              </div>
            </DynamicPosition>
          }
          video={
            <DynamicPosition
              top={450}
              left={1330}
              context={this.state.bg}
            >
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_8:
        return <ExpoBaseView
          data={this.state.data}
          isAudioPlaying={this.state.canAudioPlay}
          video={
            <DynamicPosition
              top={570}
              left={760}
              context={this.state.bg}
            >
              <div onClick={this.handleOpenVideo}>
                <IconButtonPlay size={96}/>
              </div>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_9:
        return <ExpoBaseView
          data={this.state.data}
          center={
            <div className="expo-row expo-center">
              <div>
              </div>
              <DynamicPosition
                top={450}
                left={465}
                context={this.state.bg}
              >
                <Link to={`/expo/${id}/game/mario`}>
                  <div data-tip
                       data-for={'mario'}
                  >
                    <IconButtonGame size={96}/>
                    <ExpoTooltip id={'mario'}
                                 place={'bottom'}
                                 description={'<b>Энергобезопасные приключения.</b> Помогите главному герою правильно преодолеть все преграды – не наступать на люки, не заходить за ограждения!'}
                    />
                  </div>
                </Link>
              </DynamicPosition>

              <DynamicPosition
                top={500}
                left={1150}
                context={this.state.bg}
              >
                <Link to={`/expo/${id}/game/victory`}>
                  <div data-tip
                       data-for={'victory'}
                  >
                    <IconButtonGame size={96}/>
                    <ExpoTooltip id={'victory'}
                                 place={'bottom'}
                                 description={'<b>Викторина.</b> Проверьте, насколько хорошо вы знакомы с теплобезопасностью. Сможете ли вы правильно ответить на вопросы нашей викторины?'}
                    />
                  </div>
                </Link>
              </DynamicPosition>
            </div>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      case zoneIds.z_10:
        return <ExpoBaseView
          data={this.state.data}
          bottomRight={
            <div className="expo-row expo-bottom-right">
              <DynamicPosition
                top={500}
                left={300}
                context={this.state.bg}
              >
                <div className="video-item video-item-sm">
                  <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[0])}>
                    <IconButtonPlay size={96}/>
                  </div>
                  <div>Почему происходят аварии на теплотрассах? Основные причины. </div>
                </div>
              </DynamicPosition>

              <DynamicPosition
                top={500}
                left={570}
                context={this.state.bg}
              >
                <div className="video-item">
                  <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[1])}>
                    <IconButtonPlay size={96}/>
                  </div>
                  <div>Летние отключения горячей воды. Все, что вы хотели узнать, но боялись спросить. </div>
                </div>
              </DynamicPosition>

              <DynamicPosition
                top={500}
                left={950}
                context={this.state.bg}
              >
                <div className="video-item">
                  <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[2])}>
                    <IconButtonPlay size={96}/>
                  </div>
                  <div>Куда «идут» деньги за отопление? Давайте разберемся!</div>
                </div>
              </DynamicPosition>


              <DynamicPosition
                top={500}
                left={1250}
                context={this.state.bg}
              >
                <div className="video-item">

                  <div onClick={this.openVideoItem.bind(me, me.state.data.videoIds[3])}>
                    <IconButtonPlay size={96}/>
                  </div>
                  <div>Сколько платят за отопление в Европе и России? </div>
                </div>
              </DynamicPosition>
            </div>
          }
          onAudioFinished={this.handleOpenMultipleVideo}
        />;
      case zoneIds.z_11:
        return <ExpoBaseView
          data={this.state.data}
          link={
            <DynamicPosition
              top={260}
              left={770}
              context={this.state.bg}
            >
              <a href={this.state.data.link} target="_blank" rel='noreferrer noopener'>
                <IconButtonLink/>
              </a>
            </DynamicPosition>
          }
          onAudioFinished={this.handleOpenVideo}
        />;
      default:
        return <ExpoBaseView
        data={this.state.data}
        isAudioPlaying={this.state.canAudioPlay}
        video={
          <div onClick={this.handleOpenVideo}>
            <IconButtonPlay/>
          </div>
        }
        onAudioFinished={this.handleOpenVideo}
      />;
    }
  }

  onLoadImage() {
    this.setState({bgLoading: false});

    this.saveImageData();
  }

  render() {
    const {id, miniExpoIcon, order} = this.state.data;

    const bg = id ? require(`assets/images/zones/${id}.jpg`) : '';

    return <div className={`expo-details expo-${order}`}
    >
      <div className={classNames('expo-details-inner', {
        'loading': this.state.bgLoading
      })}
           ref={this.imageWrapper}
           style={{
        background: 'black url(' + bg + ') no-repeat center center'
      }}>
        <img src={bg} alt=""
             onLoad={this.onLoadImage}
             ref={this.imageBg}
             style={{width: this.state.bg.width, height: this.state.bg.height, left: this.state.bg.left}}
             className={'expo-details-bg'}/>
        <div className="expo-overlay"/>
        <div className="container">
          <div className="expo-header-wrapper">
            <BaseHeader logoUrl={"/expo"}/>
            <div className="expo-icon">
              <img src={miniExpoIcon} alt=""/>
            </div>
          </div>

          {this.renderViews(id)}

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

export default withRouter(ExpoDetails);
