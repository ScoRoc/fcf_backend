// Libraries
import React from 'react';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// SideNavFooter

const SideNavFooter = ({ ...props }) => {
  return (
    <Box
      backgroundColor='coral'
      className='sid-nav-footer'
      cursor='pointer'
      height='60px'
      marginTop='auto'
      styledFlex='center center column'
      {...props}
    >
      <Text>logout</Text>
    </Box>
  );
};

export default SideNavFooter;
