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
  console.log(glyph);
  console.log(active);
  return (
    <NavItem
      bsSize="large"
      active={active}
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
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

export default MusicControlButton;
