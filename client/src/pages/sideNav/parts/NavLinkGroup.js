// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// NavLinkGroup

const NavLinkGroup = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Box
      className='NavLinkGroup'
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='flex-start'
      {...props}
    >
      {children}
    </Box>
  );
};

const buildStyle = theme => ({
  //
});

NavLinkGroup.propTypes = {
  //
};

NavLinkGroup.defaultProps = {
  //
};

export default NavLinkGroup;
