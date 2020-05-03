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
      background='darkgreen'
      className='side-nav-header'
      height='110px'
      padding='20px'
      styledFlex='center center'
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
