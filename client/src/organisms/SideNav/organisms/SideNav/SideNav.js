// Libraries
import React, { useDispatch } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Atoms
import { Box } from 'atoms';
// SideNav Molecules
import { SideNavFooter, SideNavHeader, SideNavLinkTile } from '../../molecules';
// Utils
import { PATHS } from 'utils/constants/urls';

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
    const { from } = location.state || { from: { pathname: PATHS.LOGIN } };
    history.replace(from);
    axios
      .delete(PATHS.AUTH)
      .then(res => {
        console.log('res: ', res);
      })
      .catch(err => console.log(err));
  };

  const links = [
    {
      icon: '[icon1]',
      path: `${PATHS.APP}${PATHS.DASHBOARD}`,
      showSideNavSubTile: false,
      text: 'Dashboard',
    },
    { icon: '[icon2]', path: `${PATHS.APP}${PATHS.WODS}`, showSideNavSubTile: false, text: 'Wods' },
    {
      icon: '[icon3]',
      path: `${PATHS.APP}${PATHS.ANNOUNCEMENTS}`,
      showSideNavSubTile: false,
      text: 'Announcements',
    },
    {
      icon: '[icon4]',
      path: `${PATHS.APP}${PATHS.EVENTS}`,
      showSideNavSubTile: false,
      text: 'Events',
    },
    {
      icon: '[icon5]',
      path: `${PATHS.APP}${PATHS.USERS}`,
      showSideNavSubTile: false,
      text: 'Users',
    },
  ];

  const tiles = links.map((link, i) => {
    const { icon, path, showSideNavSubTile, text } = link;
    // TODO change key
    return (
      <SideNavLinkTile
        icon={icon}
        key={`${i}${text}`}
        path={path}
        showSideNavSubTile={showSideNavSubTile}
        text={text}
      />
    );
  });

  return (
    <Box
      bg={theme.colors.greyDark}
      className='SideNav'
      color={theme.colors.white}
      styledFlex='stretch flex-start column'
      width='250px'
      zIndex='100'
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
