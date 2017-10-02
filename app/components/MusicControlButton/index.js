/**
*
* MusicControlButton
*
*/

import React from 'react';
// import styled from 'styled-components';
import { NavItem, Glyphicon } from 'react-bootstrap';


function MusicControlButton(props) {
  const { glyph, disabled, onClick } = props;
  return (
    <NavItem
      bsSize="large"
      disabled={disabled}
      onClick={onClick}
      style={ { width: '48px' } }
    >
      <Glyphicon glyph={glyph} />
    </NavItem>
  );
}

MusicControlButton.propTypes = {
  glyph: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default MusicControlButton;
