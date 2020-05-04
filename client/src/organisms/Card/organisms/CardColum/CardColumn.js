// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// CardColumn

const CardColumn = ({ children, ...props }) => {
  return (
    <Box className='CardColumn' styledFlex='center space-evenly column' {...props}>
      {children}
    </Box>
  );
};

CardColumn.propTypes = {
  //
};

CardColumn.defaultProps = {
  //
};

export default CardColumn;
