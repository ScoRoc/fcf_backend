// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// Legend

const Legend = ({ children, ...props }) => {
  return (
    <Box className='Legend' styledFlex='center space-evenly' {...props}>
      <Text>super admin [icon]</Text>
      <Text margin='0 10px'>admin [icon]</Text>
      <Text>user [icon]</Text>
    </Box>
  );
};

Legend.propTypes = {
  children: PropTypes.element,
};

Legend.defaultProps = {
  children: null,
};

export default Legend;
