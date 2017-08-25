/**
*
* MusicControlTrack
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Panel } from 'react-bootstrap';

function MusicControlTrack(props) {
  const { track } = props;
  if (!track) {
    return (<div>No track</div>);
  }

  return (
    <Panel>
      <h5>{track.name}</h5>
      <h6>{track.artists[0].name} - {track.album.name} ({track.album.date})</h6>
    </Panel>
  );
}

MusicControlTrack.propTypes = {
  track: React.PropTypes.object,
};

export default MusicControlTrack;
