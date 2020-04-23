// Libraries
import React, { useDispatch } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation, Link } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// SideNav Parts
import NavHeader from './NavHeader';
import NavLinkGroup from './NavLinkGroup';
// Widgets
import { Text } from 'widgets';
// Constants
import { URL } from 'constants/urls';
import themes from '../../../theme/themes';

// SideNav

const SideNav = props => {
  // Dispatchers

  const logout = useDispatch('logout');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Functions

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

  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <div css={styles.sidenav}>
      <NavHeader />
      <NavLinkGroup />

      <div>
        {/* Links */}
        <Text variant='secondary'>links...</Text>
      </div>

      <button onClick={handleClick}>logout</button>
    </div>
  );
};

const buildStyle = theme => ({
  sidenav: css`
    background-color: ${theme.colors.greyDark};
    width: 250px;

    & * {
      color: ${theme.color.white};
    }
  `,
});

SideNav.propTypes = {
  //
};

SideNav.defaultProps = {
  //
};

export default SideNav;
