// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// SideNav Molecules
import SideNavSubTile from '../SideNavSubTile/SideNavSubTile';
// Atoms
import { Box, Text } from 'atoms';

// SideNavLinkTile

const SideNavLinkTile = ({ icon, path, showSideNavSubTile, text, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      backgroundColor='darkblue'
      border='1px solid lightgrey'
      boxSizing='border-box'
      className='side-nav-link-tile'
      height='80px'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position='relative'
      width='100%'
      {...props}
    >
      <NavLink css={{ textDecoration: 'none' }} to={path}>
        <Box
          bg={'darkblue'}
          className='side-nav-link-main'
          padding='0 20px 0 40px'
          position='relative'
          styledFlex='center space-between'
          zIndex={10}
        >
          <Text bg='cadetblue' color='maroon'>
            {icon}
          </Text>
          <Text color='white'>{text}</Text>
        </Box>
      </NavLink>

      {showSideNavSubTile && <SideNavSubTile isHovered={isHovered} path={path} />}
    </Box>
  );
};

SideNavLinkTile.propTypes = {
  icon: PropTypes.string.isRequired, // TODO update prop type
  path: PropTypes.string.isRequired, // must be a valid path string ie. "/wods"
  showSideNavSubTile: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

SideNavLinkTile.defaultProps = {
  icon: null,
  path: null,
  showSideNavSubTile: false,
  text: null,
};

export default SideNavLinkTile;