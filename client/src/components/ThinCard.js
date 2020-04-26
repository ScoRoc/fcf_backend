// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box, Card, Separator } from 'widgets';

// ThinCard

const ThinCard = ({ leftText, rightText, ...props }) => (
  <Card
    alignItems='center'
    className='ThinCard'
    display='flex'
    flexDirection='row'
    justifyContent='space-around'
    {...props}
  >
    <Box alignItems='center' display='flex'>
      {leftText}
    </Box>
    <Separator />
    <Box alignItems='center' display='flex'>
      {rightText}
    </Box>
  </Card>
);

ThinCard.propTypes = {
  leftText: PropTypes.string,
  rightText: PropTypes.string,
};

ThinCard.defaultProps = {
  leftText: null,
  rightText: null,
};

export default ThinCard;
