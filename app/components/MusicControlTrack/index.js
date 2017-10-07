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
    return (<Navbar.Header style={{ width: '580px' }}>
      <div>
        <h4>No track</h4>
      </div>
    </Navbar.Header>);
  }

  return (
    <Navbar.Header style={{ width: '450px' }}>
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
