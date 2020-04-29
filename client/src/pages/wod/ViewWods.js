// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box, Text } from 'widgets';

// ViewWods

const ViewWods = ({ children }) => {
  return (
    <Box className='ViewWods'>
      <Text>ViewWods page</Text>
    </Box>
  );
};

ViewWods.propTypes = {
  children: PropTypes.element,
};

ViewWods.defaultProps = {
  children: null,
};

export default ViewWods;
