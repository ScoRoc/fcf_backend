// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// NavLogout

const NavLogout = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Box
      bg='coral'
      className='NavLogout'
      cursor='pointer'
      display='flex'
      flexDirection='column'
      height='60px'
      justifyContent='flex-end'
      marginTop='auto'
      {...props}
    >
      {children}
    </Box>
  );
};

const buildStyle = theme => ({
  //
});

NavLogout.propTypes = {
  //
};

NavLogout.defaultProps = {
  //
};

export default NavLogout;
