// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Text } from 'atoms';

// CardPageTitleBar

const CardPageTitleBar = ({ onButtonClick, title, ...props }) => {
  return (
    <Box
      alignSelf='flex-start'
      className='CardPageTitleBar'
      height='auto'
      marginBottom='20px'
      styledFlex='center space-between'
      {...props}
    >
      <Text>{title}</Text>
      <Button onClick={onButtonClick}>Add New</Button>
    </Box>
  );
};

CardPageTitleBar.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

CardPageTitleBar.defaultProps = {
  onButtonClick: null,
  title: null,
};

export default CardPageTitleBar;
