// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box, Text } from 'widgets';

// NavLinkTile

const NavLinkTile = ({ children, path, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <NavLink
      className='NavLinkTile'
      css={{
        alignItems: 'center',
        border: '1px solid lightgrey',
        display: 'flex',
        height: '80px',
        justifyContent: 'space-between',
        padding: '0 20px 0 40px',
        textDecoration: 'none',
      }}
      to={path}
      {...props}
    >
      {children}
    </NavLink>
  );
};

const buildStyle = theme => ({
  //
});

NavLinkTile.propTypes = {
  //
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
};

NavLinkTile.defaultProps = {
  //
  text: 'NavLinkTile',
};

export default NavLinkTile;
