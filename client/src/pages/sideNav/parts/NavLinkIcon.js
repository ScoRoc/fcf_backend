// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// NavLinkIcon

const NavLinkIcon = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Box bg='cadetblue' className='NavLinkIcon' color='maroon' {...props}>
      {children}
    </Box>
  );
};

const buildStyle = theme => ({
  //
});

NavLinkIcon.propTypes = {
  children: PropTypes.element,
};

NavLinkIcon.defaultProps = {
  children: null,
};

export default NavLinkIcon;
