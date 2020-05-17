// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// Separator

const Separator = props => {
  return (
    <Box bg='yellow' className='Separator' height='80%' margin='10% 0' width='1px' {...props} />
  );
};

Separator.propTypes = {
  // children: PropTypes.element,
};

Separator.defaultProps = {
  // children: null,
};

export default Separator;
