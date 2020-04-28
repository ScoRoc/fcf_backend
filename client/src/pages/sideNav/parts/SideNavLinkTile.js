// Libraries
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Components
import SideNavSubTile from './SideNavSubTile';
// Widgets
import { Box, Text } from 'widgets';

const defaultContext = { isHovered: false };

export const SideNavLinkTileContext = createContext(defaultContext);

// SideNavLinkTile

const SideNavLinkTile = ({ icon, path, text, ...props }) => {
  const [isHovered, setIsHovered] = useState(defaultContext.isHovered);

  return (
    <SideNavLinkTileContext.Provider value={isHovered}>
      <NavLink
        alignItems='center'
        backgroundColor='darkblue'
        border='1px solid lightgrey'
        className='side-nav-link-tile'
        css={{ textDecoration: 'none' }}
        display='flex'
        height='80px'
        justifyContent='space-between'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        padding='0 20px 0 40px'
        position='relative'
        to={path}
        width='100%'
        zIndex={10}
        {...props}
      >
        <Box css={{ backgroundColor: 'darkblue' }} path={path}>
          <Text bg='cadetblue' className='side-nav-icon-placeholder' color='maroon'>
            {icon}
          </Text>
          <Text className='side-nav-text-placeholder' color='white'>
            {text}
          </Text>
        </Box>

        <SideNavSubTile />
      </NavLink>
    </SideNavLinkTileContext.Provider>
  );
};

SideNavLinkTile.propTypes = {
  children: PropTypes.element,
};

SideNavLinkTile.defaultProps = {
  children: null,
};

export default SideNavLinkTile;
