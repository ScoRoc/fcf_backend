// Libraries
import React, { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Constants
import { URL } from '../../constants/index';

// HomePage

const HomePage = props => {
  // Global State
  const [user] = useGlobal('user');

  // Theme

  const theme = useTheme();

  // Styles

  const styles = buildStyles(theme);

  // If no token, go to LoginPage

  if (!user.token) return <Redirect to={URL.LOGIN} />;

  // Return

  return (
    <div>
      <p css={styles.p}>home</p>
    </div>
  );
};

const buildStyles = theme => ({
  p: {
    color: theme.color,
  },
});

export default HomePage;
