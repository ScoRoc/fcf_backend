// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Text } from 'atoms';
// User Molecules
import Legend from '../Legend/Legend';

// UsersHeader

const UsersHeader = ({ children, ...props }) => {
  return (
    <Box
      backgroundColor='blanchedalmond'
      className='UsersHeader'
      height='50px'
      padding='0 20px'
      styledFlex='center space-between'
      {...props}
    >
      <Text flex={2}>Users page</Text>
      <Legend flex={8} />
      <Box flex={2} styledFlex='center flex-end'>
        <Button width='100px'>Add New</Button>
      </Box>
    </Box>
  );
};

UsersHeader.propTypes = {
  children: PropTypes.element,
};

UsersHeader.defaultProps = {
  children: null,
};

export default UsersHeader;
