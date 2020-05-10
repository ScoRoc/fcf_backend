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

const CardPageLayout = ({ children, onButtonClick, title, ...props }) => (
  <Box
    className='CardPageLayout'
    flex={1}
    overflowY='scroll'
    padding='30px 30px 0 30px'
    styledFlex='center flex-start column'
    {...props}
  >
    <CardPageTitleBar onButtonClick={onButtonClick} title={title} />
    {children}
  </Box>
);

CardPageLayout.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

CardPageLayout.defaultProps = {
  onButtonClick: null,
  title: '',
};

export default CardPageLayout;
