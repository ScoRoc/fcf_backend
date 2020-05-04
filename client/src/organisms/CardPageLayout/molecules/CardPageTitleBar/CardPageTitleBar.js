// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Text } from 'atoms';

// CardPageTitleBar

const CardPageTitleBar = ({ onClick, title, ...props }) => {
  return (
    <Box
      className='CardPageTitleBar'
      marginBottom='20px'
      styledFlex='center space-between'
      {...props}
    >
      <Text>{title}</Text>
      <Button onClick={onClick}>Add New</Button>
    </Box>
  );
};

CardPageTitleBar.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

CardPageTitleBar.defaultProps = {
  onClick: null,
  title: '',
};

export default CardPageTitleBar;
