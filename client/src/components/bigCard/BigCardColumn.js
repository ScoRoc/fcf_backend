// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Box } from 'widgets';

// BigCardColumn

const BigCardColumn = ({ icon, text, ...props }) => {
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

BigCardColumn.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

BigCardColumn.defaultProps = {
  icon: null,
  text: null,
};

export default BigCardColumn;
