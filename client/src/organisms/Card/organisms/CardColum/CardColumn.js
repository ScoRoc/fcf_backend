// Libraries
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// CardColumn

const CardColumn = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      className='CardColumn'
      padding='10px'
      ref={ref}
      styledFlex='center space-evenly column'
      {...props}
    >
      {children}
    </Box>
  );
});

CardColumn.propTypes = {
  //
};

CardColumn.defaultProps = {
  //
};

export default CardColumn;
