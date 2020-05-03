// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box, Card, Separator } from 'widgets';

// DashboardThinCard

const DashboardThinCard = ({ leftText, rightText, ...props }) => (
  <Card className='DashboardThinCard' styledFlex='center space-around' {...props}>
    <Box styledFlex='center center'>{leftText}</Box>
    <Separator />
    <Box styledFlex='center center'>{rightText}</Box>
  </Card>
);

DashboardThinCard.propTypes = {
  leftText: PropTypes.string,
  rightText: PropTypes.string,
};

DashboardThinCard.defaultProps = {
  leftText: null,
  rightText: null,
};

export default DashboardThinCard;
