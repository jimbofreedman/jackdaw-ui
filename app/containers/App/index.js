/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
// import BootstrapCss from 'bootstrap/dist/css/bootstrap.min.css'; // eslint-disable-line no-unused-vars
import BootstrapSlateCss from 'css/bootstrap-slate.css'; // eslint-disable-line no-unused-vars

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';
import withProgressBar from 'components/ProgressBar';
import MusicControl from '../../containers/MusicControl';
import rest from '../../rest';

const AppWrapper = styled.div`
  width: 960px;
  margin: 0 0 0 0 ;
  display: flex;
  min-height: 540px;
  padding: 0 0 0 0;
  flex-direction: column;
`;

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
  }

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        <Header />
        {React.Children.toArray(this.props.children)}
        <MusicControl />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const mapStateToProps = createStructuredSelector({
});

export default withProgressBar(connect(mapStateToProps, mapDispatchToProps)(App));
