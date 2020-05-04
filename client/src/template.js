// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// Template

const Template = ({ children }) => {
  return <Box className='Template'>{children}</Box>;
};

Template.propTypes = {
  children: PropTypes.element,
};

Template.defaultProps = {
  children: null,
};

export default Template;
