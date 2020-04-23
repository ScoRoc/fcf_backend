// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Home Parts
import SideNav from './sideNav/SideNav';
// Components
import Dashboard from './dashboard/Dashboard';
// Constants
import { URL } from 'constants/index';

// Home

const Home = props => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  // Return

  return (
    <div css={styles.body}>
      <SideNav />

      <div>
        <Route path={URL.ROOT} component={Dashboard} />
        <Route path={URL.WODS} render={() => <p>WOD PAGE</p>} />
        <Route path={URL.ANNOUNCEMENTS} render={() => <p>ANNOUNCEMENTS PAGE</p>} />
        <Route path={URL.EVENTS} render={() => <p>EVENTS PAGE</p>} />
        <Route path={URL.USERS} render={() => <p>USERS PAGE</p>} />
      </div>
    </div>
  );
};

const buildStyle = theme => ({
  body: {
    background: theme.background,
    display: 'flex',
  },
});

Home.propTypes = {
  //
};

Home.defaultProps = {
  //
};

export default Home;
