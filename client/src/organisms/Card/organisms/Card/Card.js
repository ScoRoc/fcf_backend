// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// Card

const Card = ({ children, ...props }) => (
  <Box bg='sienna' className='Card' styledFlex='stretch space-between column' {...props}>
    {children}
  </Box>
);

Card.propTypes = {
  //
};

Card.defaultProps = {
  //
};

export default Card;
