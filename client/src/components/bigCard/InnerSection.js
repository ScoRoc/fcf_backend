// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

// InnerSection

const InnerSection = ({ icon, text, ...props }) => {
  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='space-evenly'
      {...props}
    >
      <Box>{text}</Box>
      <Box>{icon}</Box>
    </Box>
  );
};

InnerSection.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

InnerSection.defaultProps = {
  icon: null,
  text: null,
};

export default InnerSection;
