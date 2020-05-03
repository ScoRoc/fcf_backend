// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

// TitleBar

const TitleBar = ({ children, ...props }) => {
  return (
    <Box className='TitleBar' marginBottom='20px' styledFlex='center space-between' {...props}>
      {children}
    </Box>
  );
};

TitleBar.propTypes = {
  children: PropTypes.element,
};

TitleBar.defaultProps = {
  children: null,
};

export default TitleBar;
