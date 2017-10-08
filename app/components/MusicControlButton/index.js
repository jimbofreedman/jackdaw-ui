/**
*
* MusicControlButton
*
*/

import React from 'react';
// import styled from 'styled-components';
import { NavItem, Glyphicon, Button } from 'react-bootstrap';


function MusicControlButton(props) {
  const { glyph, disabled, onClick, active } = props;
  return (
    <NavItem
      active={active}
      disabled={disabled}
      onClick={onClick}
      style={ { width: '64px' } }
    >
      <Glyphicon glyph={glyph} style={ { marginTop: '18px', fontSize: '2em' } } />
    </NavItem>
  );
}

MusicControlButton.propTypes = {
  glyph: React.PropTypes.string,
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default MusicControlButton;
