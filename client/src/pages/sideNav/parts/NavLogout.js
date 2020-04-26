// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

// NavLogout

const NavLogout = ({ children, ...props }) => (
  <Box
    alignItems='center'
    bg='coral'
    className='NavLogout'
    cursor='pointer'
    display='flex'
    flexDirection='column'
    height='60px'
    justifyContent='center'
    marginTop='auto'
    {...props}
  >
    {children}
  </Box>
);

NavLogout.propTypes = {
  //
};

NavLogout.defaultProps = {
  //
};

export default NavLogout;
