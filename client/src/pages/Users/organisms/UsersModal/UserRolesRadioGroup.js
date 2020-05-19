// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, StyledInput, Text } from 'atoms';

// UserRolesRadioGroup

const UserRolesRadioGroup = ({ children }) => {
  return (
    <Box height='auto' margin='40px 0' width='100%'>
      <Text marginBottom='10px'>Permissions</Text>

      <Box height='auto' styledFlex='stretch space-between'>
        {/* <Button fontSize='1.3rem' height='40px' width='31%'>
          User
        </Button>
        <Button fontSize='1.3rem' height='40px' width='31%'>
          Admin
        </Button>
        <Button fontSize='1.3rem' height='40px' width='31%'>
          Super-Admin
        </Button> */}

        <StyledInput cursor='pointer' height='30px' type='radio' width='80px' />
      </Box>
    </Box>
  );
};

UserRolesRadioGroup.propTypes = {
  children: PropTypes.element,
};

UserRolesRadioGroup.defaultProps = {
  children: null,
};

export default UserRolesRadioGroup;
