/**
*
* MusicControlTrack
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

function MusicControlTrack(props) {
  const { track } = props;
  if (!track) {
    return (<div>No track</div>);
  }

  return (
    <Navbar.Header>
      <div>
        <h5>{track.name}</h5>
        <h6>{track.artists[0].name} - {track.album.name} ({track.album.date})</h6>
      </div>
    </Navbar.Header>
  );
}

MusicControlTrack.propTypes = {
  track: React.PropTypes.object,
};

export default MusicControlTrack;
