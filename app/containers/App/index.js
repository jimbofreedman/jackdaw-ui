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

import Header from 'components/Header';
import withProgressBar from 'components/ProgressBar';
import MusicControl from '../../containers/MusicControl';


const AppWrapper = styled.div`
  width: 960px;
  margin: 0 0 0 0 ;
  display: flex;
  min-height: 540px;
  padding: 0 0 0 0;
  flex-direction: column;
`;

export function App(props) {
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
      {React.Children.toArray(props.children)}
      <MusicControl />
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
