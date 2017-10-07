/*
 *
 * MusicControl
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Grid, Row, Col, Navbar, Nav, NavItem, Button, Glyphicon, NavDropdown, MenuItem } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
// import ReactBootstrapSlider from 'react-bootstrap-slider';
import Mopidy from 'mopidy';
import SliderCss from 'bootstrap-slider/dist/css/bootstrap-slider.min.css'; // eslint-disable-line no-unused-vars

import makeSelectMusicControl from './selectors';
import config from '../../config';
import MusicControlButton from '../../components/MusicControlButton';
import MusicControlTrack from '../../components/MusicControlTrack';
// import MusicControlTimer from '../../components/MusicControlTimer';

export class MusicControl extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      showPlaylistSelect: false,
      random: false,
      repeat: false,
      single: false
    };

    this.onOnline = this.onOnline.bind(this);
    this.getRepeatMode = this.getRepeatMode.bind(this);
    this.nextRepeatMode = this.nextRepeatMode.bind(this);
  }

  componentDidMount() {
    this.mopidy = new Mopidy({
      webSocketUrl: `${config.mopidyEndpoint}/mopidy/ws/`,
      callingConvention: 'by-position-or-by-name',
      console: true,
    });
    // this.mopidy.on(console.log.bind(console)); // es-lint-disable-line no-console

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

  getRepeatMode() {
    const newMode = this.state.repeat ? (this.state.single ? 'single' : 'repeat') : 'off';
    return newMode;
  }

  nextRepeatMode() {
    const repeatMode = this.getRepeatMode();

    if (repeatMode == 'off') {
      this.mopidy.tracklist.setRepeat([true])
        .then(this.setState({repeat: true}));
    } else if (repeatMode == 'repeat') {
      this.mopidy.tracklist.setSingle([true])
        .then(this.setState({single: true}));
    } else {
      this.mopidy.tracklist.setRepeat([false])
        .then(this.mopidy.tracklist.setSingle([false]))
        .then(this.setState({repeat: false, single: false}))
    }
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

    this.mopidy.playlists.asList({}).then((data) => {
      this.setState({ playlists: data });
    });

    this.mopidy.tracklist.getRandom()
      .then((random) => { this.setState({ random }); });

    this.mopidy.tracklist.getRepeat()
      .then((repeat) => { this.setState({ repeat }); });

    this.mopidy.tracklist.getSingle()
      .then((single) => { this.setState({ single }); });
  }

  render() {
    const offline = !this.state.online;
    const playing = this.state.playbackState === 'playing';
    const playlists = this.state.playlists ? this.state.playlists.slice() : [];
    const showPlaylistSelect = this.state.showPlaylistSelect;

    const repeatMode = this.getRepeatMode();

    const zippedPlaylists = [];
    while (playlists.length > 0)
      zippedPlaylists.push(playlists.splice(0, 3));

    const getChangeVolumeFunc = (amount) => { // eslint-disable-line arrow-body-style
      return () => this.mopidy.playback.setVolume({ volume: this.state.volume + amount });
    };

    const repeatGlyphs = {
      'off': 'refresh',
      'repeat': 'refresh',
      'single': 'repeat'
    }

    return (
      <div>
        <Modal bsSize="large" show={showPlaylistSelect}>
          <Modal.Body>
            <Grid>
              {zippedPlaylists.map((rowPlaylists, index) => {
                return (
                  <Row key={index}>
                    {rowPlaylists.map((playlist, index2) =>
                      <Col key={index2} md={3}>
                        <Button
                          style={{width: '100%', textOverflow: 'ellipsis', overflow: 'hidden'}}
                          onClick={() => {
                            this.setState({showPlaylistSelect: false});
                            this.mopidy.tracklist.clear()
                              .then(this.mopidy.tracklist.add({uri: playlist.uri}))
                              .then(this.mopidy.playback.play())
                          }}>
                          {playlist.name}
                        </Button>
                      </Col>
                    )}
                  </Row>
                );
              })}
            </Grid>
          </Modal.Body>
        </Modal>

        <Navbar style={ { width: '960px' } }>

          <MusicControlTrack track={this.state.track} />

          <Nav>
            <MusicControlButton glyph="music" disabled={offline} onClick={() => { this.setState({ showPlaylistSelect: !this.state.showPlaylistSelect }) }} />
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

            <MusicControlButton glyph="volume-down" disabled={offline || this.state.volume === 0} onClick={getChangeVolumeFunc(-4)} />
            <NavItem style={ { width: '48px' } }>
              {this.state.volume}
            </NavItem>
            <MusicControlButton glyph="volume-up" disabled={offline || this.state.volume === 100} onClick={getChangeVolumeFunc(4)} />
            <MusicControlButton glyph="random" active={this.state.random} disabled={offline} onClick={() => {
              this.mopidy.tracklist.setRandom([!this.state.random])
                .then(this.setState({random: !this.state.random}));
            }} />
            <MusicControlButton glyph={repeatGlyphs[repeatMode]} active={repeatMode != 'off'} disabled={offline} onClick={() => { this.nextRepeatMode(); }} />
          </Nav>
        </Navbar>
      </div>
    );
  }
}

/*

 */

/*
  {/*<ReactBootstrapSlider}
// {/*disabled={offline ? 'disabled' : null} value={this.state.volume} min={0} max={100}}
// {/*slideStop={(evt) => {}
// {/*this.mopidy.playback.setVolume({ volume: evt.target.value });}
// {/*}}}
// {/>}
// {<MusicControlButton glyph="volume-off" disabled={offline} onClick={() => { this.mopidy.playback.previous({}); }} />}
 */

//         {/*<MusicControlTimer disabled={offline} timeEnd={this.state.track ? this.state.track.length : 0} timePosition={this.state.timePosition} playing={playing} />*/}

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
