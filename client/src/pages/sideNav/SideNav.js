// Libraries
import React, { useDispatch } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// SideNav Parts
import {
  NavHeader,
  NavLinkIcon,
  NavLinkGroup,
  NavLogout,
  NavLinkText,
  NavLinkTile,
} from './parts/index';
// Widgets
import { Box, Text } from 'widgets';
// Constants
import { URL } from 'constants/urls';

// SideNav

const SideNav = props => {
  // Dispatchers

  const logout = useDispatch('logout');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

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

  const links = [
    { icon: '[icon1]', path: `${URL.APP}${URL.DASHBOARD}`, text: 'Dashboard' },
    { icon: '[icon2]', path: `${URL.APP}${URL.WODS}`, text: 'Wods' },
    { icon: '[icon3]', path: `${URL.APP}${URL.ANNOUNCEMENTS}`, text: 'Announcements' },
    { icon: '[icon4]', path: `${URL.APP}${URL.EVENTS}`, text: 'Events' },
    { icon: '[icon5]', path: `${URL.APP}${URL.USERS}`, text: 'Users' },
  ];

  const tiles = links.map(link => {
    const { path, text } = link;
    const icon = link.icon;
    return (
      <NavLinkTile className='side-nav-tile' key={uuidv4()} path={path}>
        <NavLinkIcon>
          <Text className='side-nav-icon-placeholder'>{icon}</Text>
        </NavLinkIcon>
        <NavLinkText className='side-nav-text-placeholder'>{text}</NavLinkText>
      </NavLinkTile>
    );
  });

  return (
    <Box className='SideNav' css={styles.sidenav}>
      <NavLinkGroup>
        <NavHeader className='side-nav-header'>
          <Text style={{ marginRight: '10px' }} variant='secondary'>
            [logo]
          </Text>
          <Text variant='secondary'>Foundation CrossFit</Text>
        </NavHeader>

        {tiles}

        <NavLogout onClick={handleClick}>
          <Text>logout</Text>
        </NavLogout>
      </NavLinkGroup>
    </Box>
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
