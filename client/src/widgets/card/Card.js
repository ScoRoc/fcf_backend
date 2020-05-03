// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

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
