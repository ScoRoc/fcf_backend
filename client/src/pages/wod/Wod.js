// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Widgets
import { Box, Text } from 'widgets';

// Wod

const Wod = ({ children }) => {
  return (
    <Box
      alignItems='center'
      className='Wod'
      display='flex'
      flex={1}
      flexDirection='column'
      height='100%'
    >
      <Box
        css={{ boxSizing: 'border-box' }}
        display='flex'
        flex={1}
        flexDirection='column'
        height='100%'
        justifyContent='space-between'
        padding='50px 50px'
      >
        <Text>Start Date</Text>

        <Text>Name</Text>
        <Box bg='grey' width='500px' height='200px'></Box>

        <Text>Description</Text>
        <Box bg='grey' width='500px' height='200px'></Box>
      </Box>

      <Box display='flex' width='100%'>
        <Box
          css={css`
            align-items: center;
            background-color: grey;
            color: white;
            display: flex;
            height: 45px;
            justify-content: center;
            width: 50%;

            &:hover {
              background-color: darkgrey;
            }

            &:active {
              background-color: #666;
            }
          `}
        >
          <Text>Preview</Text>
        </Box>
        <Box
          css={css`
            align-items: center;
            background-color: grey;
            color: white;
            display: flex;
            height: 45px;
            justify-content: center;
            width: 50%;

            &:hover {
              background-color: darkgrey;
            }

            &:active {
              background-color: #666;
            }
          `}
        >
          <Text>Save</Text>
        </Box>
      </Box>
    </Box>
  );
};

Wod.propTypes = {
  children: PropTypes.element,
};

Wod.defaultProps = {
  children: null,
};

export default Wod;
