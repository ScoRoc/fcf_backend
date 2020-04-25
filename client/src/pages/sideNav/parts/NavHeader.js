// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// NavHeader

const NavHeader = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Box
      alignItems='center'
      background='darkgreen'
      boxSizing='border-box'
      className='NavHeader'
      display='flex'
      height='90px'
      justifyContent='center'
      padding='20px'
      {...props}
    >
      {/* Nav Header */}
      {children}
    </Box>
  );
};

const buildStyle = theme => ({
  header: {},
});

NavHeader.propTypes = {
  //
};

NavHeader.defaultProps = {
  //
};

export default NavHeader;
