/*
 *
 * Map
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectMap from './selectors';
import { loadGpsData } from './actions';
import LeafletMap from 'components/LeafletMap';


export class Map extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const position = this.props.Map.data ? [this.props.Map.data.latitude, this.props.Map.data.longitude] : [0, 0];
    // console.log(this.props.Map.data ? this.props.Map.data.time : '');
    // console.log(position);
    return (
      <LeafletMap position={position} />
    );
  }
}

Map.propTypes = {
  loadGpsData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Map: makeSelectMap(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadGpsData: () => dispatch(loadGpsData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
