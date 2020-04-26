// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

// CardBody

const CardBody = ({ children, ...props }) => (
  <Box
    alignItems='center'
    className='CardBody'
    display='flex'
    flex={1}
    justifyContent='center'
    {...props}
  >
    {children}
  </Box>
);

CardBody.propTypes = {
  //
};

CardBody.defaultProps = {
  //
};

export default CardBody;
