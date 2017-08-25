/**
*
* MusicControlTrack
*
*/

import React from 'react';
// import styled from 'styled-components';


function MusicControlTrack(props) {
  const { timePosition, track } = props;
  if (!track) {
    return (<div>No track</div>);
  }

  return (
    <div>
      <div>{track.name}</div>
      <div>{track.artists[0].name} - {track.album.name} {track.album.date}</div>
      <div>{timePosition} / {track.length}</div>
    </div>
  );
}

MusicControlTrack.propTypes = {
  track: React.PropTypes.object,
  timePosition: React.PropTypes.number,
};

export default MusicControlTrack;
