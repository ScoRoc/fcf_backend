// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// CardPageLayout Molecules
import { CardPageTitleBar } from '../../molecules';

// CardPageLayout

const CardPageLayout = ({ children, onButtonClick, title, titleBarStyles, ...props }) => (
  <Box className='CardPageLayout' flex={1} styledFlex='center flex-start column' {...props}>
    <CardPageTitleBar
      css={titleBarStyles}
      onButtonClick={onButtonClick}
      title={title}
      zIndex={10}
    />
    <Box
      css={css`
        & > div:nth-of-type(1) {
          margin-top: 20px;
        }
      `}
      overflowY='scroll'
      padding='0 20px'
      styledFlex='stretch flex-start column'
    >
      {children}
    </Box>
  </Box>
);

CardPageLayout.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  titleBarStyles: PropTypes.object,
};

CardPageLayout.defaultProps = {
  onButtonClick: null,
  title: '',
  titleBarStyles: null,
};

export default CardPageLayout;
