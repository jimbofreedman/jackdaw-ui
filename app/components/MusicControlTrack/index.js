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
      <h3>{track.name}</h3>
      <h4>{track.artists[0].name} - {track.album.name} ({track.album.date})</h4>
    </Panel>
  );
}

MusicControlTrack.propTypes = {
  track: React.PropTypes.object,
};

export default MusicControlTrack;
