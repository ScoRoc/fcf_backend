// Libraries
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// UsersCardHeaderBar

const UsersCardHeaderBar = forwardRef(({ children }, ref) => {
  return (
    <Box
      backgroundColor='rgba(255, 255, 255, 0.7)'
      border='1px solid black'
      className='UsersCardHeaderBar'
      height='auto'
      marginTop='40px'
      padding='2px 0'
      ref={ref}
      styledFlex='stretch space-evenly'
    >
      <Text>Full Name</Text>
      <Text>Email</Text>
      <Text>Total likes</Text>
      <Text>Total Views</Text>
      <Text>Last Login</Text>
    </Box>
  );
});

UsersCardHeaderBar.propTypes = {
  children: PropTypes.element,
};

UsersCardHeaderBar.defaultProps = {
  children: null,
};

export default UsersCardHeaderBar;
