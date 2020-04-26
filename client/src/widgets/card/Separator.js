// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

// Separator

const Separator = ({ children }) => {
  return (
    <Box
      bg='yellow'
      className='Separator'
      // css={{ boxSizing: 'border-box' }}
      height='80%'
      margin='10% 0'
      width='1px'
    />
  );
};

Separator.propTypes = {
  children: PropTypes.element,
};

Separator.defaultProps = {
  children: null,
};

export default Separator;
