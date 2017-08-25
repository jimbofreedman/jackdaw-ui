/**
*
* MusicControlTimer
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Panel } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';

import SliderCss from 'bootstrap-slider/dist/css/bootstrap-slider.min.css'; // eslint-disable-line no-unused-vars


class MusicControlTimer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      msSinceUpdate: 0,
    };

    this.tick = this.tick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ msSinceUpdate: 0 });
    clearInterval(this.state.timer);
    if (nextProps.playing) {
      this.setState({ timer: setInterval(this.tick, 1000) });
    }
  }

  tick() {
    this.setState({
      msSinceUpdate: this.state.msSinceUpdate + 1000,
    });
  }

  render() {
    const { timePosition, timeEnd, disabled } = this.props;
    const currentTime = timePosition + this.state.msSinceUpdate;

    return (
      <Panel>
        <ReactBootstrapSlider
          disabled={disabled ? 'disabled' : null} value={currentTime} min={0} max={timeEnd}
          slideStop={(evt) => {
            console.log(evt);
          }}
        />
        {currentTime} / {timeEnd}
      </Panel>
    );
  }
}

MusicControlTimer.propTypes = {
  timePosition: React.PropTypes.number,
  timeEnd: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  playing: React.PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

export default MusicControlTimer;
