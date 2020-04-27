// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';

// NavLinkTile

const NavLinkTile = ({ children, path, ...props }) => (
  <NavLink
    className='NavLinkTile'
    css={{
      alignItems: 'center',
      border: '1px solid lightgrey',
      display: 'flex',
      height: '80px',
      justifyContent: 'space-between',
      padding: '0 20px 0 40px',
      position: 'relative',
      textDecoration: 'none',
      zIndex: 10,
    }}
    to={path}
    {...props}
  >
    {children}
  </NavLink>
);

NavLinkTile.propTypes = {
  //
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
};

NavLinkTile.defaultProps = {
  //
  text: 'NavLinkTile',
};

export default NavLinkTile;
