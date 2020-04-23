// Libraries
import React, { useDispatch, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

// Box
import { Box } from 'widgets';

// Dashboard

const Dashboard = props => {
  // Global State
  const [user] = useGlobal('user');

  // Dispathers
  const logout = useDispatch('logout');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Theme

  const theme = useTheme();

  // Styles

  const styles = buildStyles(theme);

  // Return

  return (
    <div>
      <p css={styles.p}>DASHBOARD PAGE</p>
      <Box color='red'>Box</Box>
      <Box
        css={css`
          color: ${theme.color.tertiary};
          background: black;
        `}
      >
        Box also
      </Box>
    </div>
  );
};

const buildStyles = theme => ({
  p: {
    // color: theme.color,
    // color: theme.colors.white,
  },
});

export default Dashboard;
