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
    return (<Navbar.Header>
      <div>
        <h4>No track</h4>
      </div>
    </Navbar.Header>);
  }

  return (
    <Navbar.Header>
      <div>
        <h3>{track.name}</h3>
        <h4>{track.artists[0].name} - {track.album.name} ({track.album.date})</h4>
      </div>
    </Navbar.Header>
  );
}

MusicControlTrack.propTypes = {
  track: React.PropTypes.object,
};

export default MusicControlTrack;
