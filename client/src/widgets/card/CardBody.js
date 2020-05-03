// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

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
