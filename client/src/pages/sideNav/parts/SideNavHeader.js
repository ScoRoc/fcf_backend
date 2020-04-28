// Libraries
import React from 'react';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box, Text } from 'widgets';

// SideNavHeader

const SideNavHeader = ({ ...props }) => {
  return (
    <Box
      alignItems='center'
      background='darkgreen'
      boxSizing='border-box'
      className='side-nav-header'
      display='flex'
      height='110px'
      justifyContent='center'
      padding='20px'
      width='100%'
      {...props}
    >
      <Text marginRight='10px' variant='secondary'>
        [logo]
      </Text>
      <Text variant='secondary'>Foundation CrossFit</Text>
    </Box>
  );
};

export default SideNavHeader;
