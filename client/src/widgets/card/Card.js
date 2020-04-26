// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

// Card

const Card = ({ children, ...props }) => (
  <Box
    bg='sienna'
    className='Card'
    display='flex'
    flexDirection='column'
    height='100%'
    justifyContent='space-between'
    width='100%'
    {...props}
  >
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
