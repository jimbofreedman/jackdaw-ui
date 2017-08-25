/**
*
* MusicControlButton
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Button, Glyphicon } from 'react-bootstrap';


function MusicControlButton(props) {
  const { glyph, disabled, onClick } = props;
  return (
    <Button
      bsSize="large"
      disabled={disabled}
      onClick={onClick}
    >
      <Glyphicon glyph={glyph} />
    </Button>
  );
}

MusicControlButton.propTypes = {
  glyph: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default MusicControlButton;
