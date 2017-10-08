/**
*
* LeafletMap
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import LeafletCss from 'leaflet/dist/leaflet.css'; // eslint-disable-line no-unused-vars
import config from '../../config';

export class LeafletMap extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { position } = this.props;
    return (
      <div>
        <Map cssClass="leaflet-touch" style={{ height: '930px', width: '1280px' }} center={position} zoom={13} zoomControl={false}>
          <TileLayer
            url={`${config.tileEndpoint}/osm_tiles/{z}/{x}/{y}.png`}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <CircleMarker center={position} radius={10} />
        </Map>
      </div>
    );
  }
}

LeafletMap.propTypes = {
  position: React.PropTypes.array,
};

export default LeafletMap;
