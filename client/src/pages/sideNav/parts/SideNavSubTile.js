// Libraries
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Context
import { SideNavLinkTileContext } from './SideNavLinkTile';
// Widgets
import { Box } from 'widgets';
// Constants
import { URL } from 'constants/urls';

// SideNavSubTile

const SideNavSubTile = ({ path, width, ...props }) => {
  const isHovered = useContext(SideNavLinkTileContext);

  return (
    <SideNavSubTile
      css={css`
        left: 0;
        position: absolute;
        transform: translateX(${isHovered ? width : 0});
        transition: all 250ms;
        top: 0;
        width: ${width};
      `}
      {...props}
    >
      <Box
        alignItems='center'
        bg='darkblue'
        color='red'
        boxSizing='border-box'
        display='flex'
        height='80px'
        justifyContent='space-between'
        padding='0 10px'
        width='250px'
      >
        <NavLink
          css={{
            alignItems: 'center',
            color: 'white',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            textDecoration: 'none',
            width: '100%',
          }}
          to={`${path}${URL.ADD}`}
        >
          Add
        </NavLink>
        <NavLink
          css={{
            alignItems: 'center',
            color: 'white',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            textDecoration: 'none',
            width: '100%',
          }}
          to={path}
        >
          View
        </NavLink>
      </Box>
    </SideNavSubTile>
  );
};

SideNavSubTile.propTypes = {
  children: PropTypes.element,
};

SideNavSubTile.defaultProps = {
  children: null,
};

export default SideNavSubTile;
