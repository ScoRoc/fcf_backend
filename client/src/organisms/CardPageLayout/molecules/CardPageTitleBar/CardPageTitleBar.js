// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Button, Text } from 'atoms';

// CardPageTitleBar

const CardPageTitleBar = ({ onButtonClick, title, ...props }) => {
  return (
    <Box
      alignSelf='flex-start'
      // backgroundColor='linear-gradient(to bottom, white 80%, transparent)'
      backgroundColor='white'
      boxShadow='0 2px 8px 0px rgba(0, 0, 0, 0.2)'
      // boxShadow='0 2px 6px rgba(255, 255, 255, 0.8), 0 6px 6px 0px rgba(0, 0, 0, 0.)'
      className='CardPageTitleBar'
      // css={css`
      //   background-color: linear-gradient(to bottom, white 80%, transparent);
      // `}
      height='auto'
      // marginBottom='20px'
      padding='20px 30px 20px 30px'
      position='sticky'
      styledFlex='center space-between'
      top='0'
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
