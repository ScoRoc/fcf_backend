// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box, Text } from 'widgets';

// SideNavFooter

const SideNavFooter = ({ onClick, ...props }) => {
  return (
    <Box
      alignItems='center'
      backgroundColor='coral'
      className='sid-nav-footer'
      cursor='pointer'
      display='flex'
      flexDirection='column'
      height='60px'
      justifyContent='center'
      marginTop='auto'
      onClick={onClick}
      width='100%'
      {...props}
    >
      <Text>logout</Text>
    </Box>
  );
};

SideNavFooter.propTypes = {
  onClick: PropTypes.func,
};

SideNavFooter.defaultProps = {
  onClick: null,
};

export default SideNavFooter;
