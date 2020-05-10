// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// CardBody

const CardBody = ({ children, ...props }) => (
  <Box className='CardBody' flex={1} styledFlex='center center' {...props}>
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
