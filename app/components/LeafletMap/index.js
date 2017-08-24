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

function LeafletMap() {
  return (
    <div>
      <Map cssClass="leaflet-touch" style={{ height: '300px', width: '600px' }} center={[55, 0]} zoom={13}>
        <TileLayer
          url={`${config.tileEndpoint}/osm_tiles/{z}/{x}/{y}.png`}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleMarker center={[55, 0]} radius={10} />
      </Map>
    </div>
  );
}

LeafletMap.propTypes = {

};

export default LeafletMap;
