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
      backgroundColor='coral'
      className='sid-nav-footer'
      cursor='pointer'
      height='60px'
      marginTop='auto'
      onClick={onClick}
      styledFlex='center center column'
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
