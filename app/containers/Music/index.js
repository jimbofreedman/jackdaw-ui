/*
 *
 * Music
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectMusic from './selectors';
import messages from './messages';

export class Music extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.socket = new Mopidy({
      webSocketUrl: "ws://localhost:6680/mopidy/ws/",
      callingConvention: "by-position-or-by-name"
    });
    console.log(this.socket);
    this.socket.onmessage = (event) => {
      console.log("msg received: ")
      console.log(event.data);
      // const message = JSON.parse(event.data);
      // console.log(message);
    }
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Music.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Music: makeSelectMusic(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
