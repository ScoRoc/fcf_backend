// Libraries
import React, { useDispatch } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// SideNav Parts
import { SideNavFooter, SideNavHeader, SideNavLinkTile } from './parts/index';
// Constants
import { URL } from 'constants/urls';
// Widgets
import { Box } from 'widgets';

// SideNav

const SideNav = props => {
  // Dispatchers

  const logout = useDispatch('logout');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Theme

  const theme = useTheme();

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
    const { icon, path, text } = link;
    // TODO change key
    return <SideNavLinkTile icon={icon} key={`${path}${text}`} path={path} text={text} />;
  });

  return (
    <Box
      bg={theme.colors.greyDark}
      className='SideNav'
      color={theme.colors.white}
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='flex-start'
      width='250px'
    >
      <SideNavHeader />

      {tiles}

      <SideNavFooter onClick={handleClick} />
    </Box>
  );
};

SideNav.propTypes = {
  //
};

SideNav.defaultProps = {
  //
};

export default SideNav;
