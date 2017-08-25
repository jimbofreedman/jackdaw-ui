/*
 *
 * MusicControl
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Mopidy from 'mopidy';
import SliderCss from 'bootstrap-slider/dist/css/bootstrap-slider.min.css'; // eslint-disable-line no-unused-vars

import makeSelectMusicControl from './selectors';
import config from '../../config';
import MusicControlButton from '../../components/MusicControlButton';
import MusicControlTrack from '../../components/MusicControlTrack';
import MusicControlTimer from '../../components/MusicControlTimer';

export class MusicControl extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {};

    this.onOnline = this.onOnline.bind(this);
  }

  componentDidMount() {
    this.mopidy = new Mopidy({
      webSocketUrl: `${config.mopidyEndpoint}/mopidy/ws/`,
      callingConvention: 'by-position-or-by-name',
      console: true,
    });
    this.mopidy.on(console.log.bind(console)); // es-lint-disable-line no-console

    this.mopidy.on('state:online', () => { this.onOnline(); });
    this.mopidy.on('state:offline', () => { this.setState({ online: false }); });
    this.mopidy.on('event:playbackStateChanged', (evt) => { this.setState({ playbackState: evt.new_state }); });
    this.mopidy.on('event:playbackStarted', (evt) => { this.setState({ track: evt }); });
    this.mopidy.on('event:trackPlaybackStarted', (evt) => { this.setState({ track: evt.tl_track.track }); });
    this.mopidy.on('event:volumeChanged', (evt) => { this.setState({ volume: evt.volume }); });
    this.mopidy.on('event:seeked', (evt) => { this.setState({ timePosition: evt.time_position }); });

    const onResumeOrPause = (data) => {
      this.setState({
        timePosition: data.time_position,
        track: data.tl_track.track,
      });
    };
    this.mopidy.on('event:trackPlaybackResumed', onResumeOrPause);
    this.mopidy.on('event:trackPlaybackPaused', onResumeOrPause);
  }

  onOnline() {
    this.setState({ online: true });

    this.mopidy.playback.getCurrentTrack()
      .then((track) => { this.setState({ track }); });

    this.mopidy.playback.getState({})
      .then((playbackState) => { this.setState({ playbackState }); });

    this.mopidy.playback.getTimePosition({})
      .then((timePosition) => { this.setState({ timePosition }); });

    this.mopidy.playback.getVolume({})
      .then((volume) => { this.setState({ volume }); });
  }

  render() {
    const offline = !this.state.online;
    const playing = this.state.playbackState === 'playing';

    const getChangeVolumeFunc = (amount) => { // eslint-disable-line arrow-body-style
      return () => this.mopidy.playback.setVolume({ volume: this.state.volume + amount });
    };

    return (
      <div>
        <MusicControlTrack track={this.state.track} />
        <MusicControlTimer disabled={offline} timeEnd={this.state.track ? this.state.track.length : 0} timePosition={this.state.timePosition} playing={playing} />
        <ButtonToolbar>
          <ButtonGroup>
            <Button
              bsSize="large" onClick={() => {
                this.mopidy.playlists.asList({}).then((data) => {
                  console.log(data);
                });
              }}
            ><Glyphicon glyph="music" /></Button>
            <MusicControlButton glyph="fast-backward" disabled={offline} onClick={() => { this.mopidy.playback.previous({}); }} />
            <MusicControlButton
              glyph={playing ? 'pause' : 'play'} disabled={offline}
              onClick={
                () => {
                  if (playing) {
                    this.mopidy.playback.pause({});
                  } else {
                    this.mopidy.playback.play({});
                  }
                }
              }
            />
            <MusicControlButton glyph="fast-forward" disabled={offline} onClick={() => { this.mopidy.playback.next({}); }} />
          </ButtonGroup>

          <ButtonGroup>
            <MusicControlButton glyph="volume-off" disabled={offline} onClick={() => { this.mopidy.playback.previous({}); }} />
            <MusicControlButton glyph="volume-down" disabled={offline || this.state.volume === 0} onClick={getChangeVolumeFunc(-4)} />
            <Button bsSize="large">
              <ReactBootstrapSlider
                disabled={offline ? 'disabled' : null} value={this.state.volume} min={0} max={100}
                slideStop={(evt) => {
                  this.mopidy.playback.setVolume({ volume: evt.target.value });
                }}
              />
            </Button>
            <MusicControlButton glyph="volume-up" disabled={offline || this.state.volume === 100} onClick={getChangeVolumeFunc(4)} />
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

MusicControl.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  MusicControl: makeSelectMusicControl(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicControl);
