// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';
// CardPageLayout Molecules
import { CardPageTitleBar } from '../../molecules';

// CardPageLayout

const CardPageLayout = ({ children, onButtonClick, title, titleBarStyles, ...props }) => (
  <Box
    className='CardPageLayout'
    flex={1}
    overflowY='scroll'
    styledFlex='center flex-start column'
    {...props}
  >
    <CardPageTitleBar
      css={titleBarStyles}
      onButtonClick={onButtonClick}
      title={title}
      zIndex={10}
    />
    {children}
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
