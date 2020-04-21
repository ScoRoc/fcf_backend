// Libraries
import React, { useDispatch, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Constants
import { URL } from '../../constants/index';

// HomePage

const HomePage = props => {
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

  const handleClick = () => {
    logout();
    const { from } = location.state || { from: { pathname: URL.LOGIN } };
    history.replace(from);
    axios
      .delete(URL.AUTH)
      .then(res => {
        console.log('res: ', res);
      })
      .catch(err => console.log(err));
  };

  // Return

  return (
    <div>
      <p css={styles.p}>home</p>
      <button onClick={handleClick}>logout</button>
    </div>
  );
};

const buildStyles = theme => ({
  p: {
    // color: theme.color,
    color: theme.colors.white,
  },
});

export default HomePage;
