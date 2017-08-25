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
  const loc = [51.4665195, -0.1943263];
  return (
    <div>
      <Map cssClass="leaflet-touch" style={{ height: '320px', width: '750px' }} center={loc} zoom={13}>
        <TileLayer
          url={`${config.tileEndpoint}/osm_tiles/{z}/{x}/{y}.png`}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleMarker center={loc} radius={10} />
      </Map>
    </div>
  );
}

LeafletMap.propTypes = {

};

export default LeafletMap;
