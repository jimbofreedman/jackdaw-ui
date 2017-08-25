/**
*
* LeafletMap
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import LeafletCss from 'leaflet/dist/leaflet.css'; // eslint-disable-line no-unused-vars
import CustomLeafletCss from './leaflet.css'; // eslint-disable-line no-unused-vars
import config from '../../config';

export class LeafletMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      position: [0, 0],
    };

    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.updatePosition);
    } else {
      console.log('Geolocation not supported');
    }
  }

  updatePosition(position) {
    console.log(position);
    this.setState({ position: [position.coords.latitude, position.coords.longitude] });
  }

  render() {
    const { position } = this.state;
    return (
      <div>
        <Map cssClass="leaflet-touch" style={{ height: '275px', width: '750px' }} center={position} zoom={13}>
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

};

export default LeafletMap;
