// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';
// Constants
import { URL } from 'constants/urls';

// SideNavSubTile

const SideNavSubTile = ({ isHovered, path, ...props }) => {
  return (
    <Box
      css={css`
        left: 0;
        position: absolute;
        transform: translateX(${isHovered ? '100%' : 0});
        transition: all 250ms;
        top: 0;
      `}
      {...props}
    >
      <Box
        bg='darkblue'
        color='red'
        height='80px'
        padding='0 10px'
        styledFlex='center space-between'
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
    </Box>
  );
};

SideNavSubTile.propTypes = {
  isHovered: PropTypes.bool,
  path: PropTypes.string, // must be a valid path string ie. "/wods"
};

SideNavSubTile.defaultProps = {
  isHovered: null,
  path: '',
};

export default SideNavSubTile;
