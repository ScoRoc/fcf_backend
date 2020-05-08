// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Atoms
import { Box } from 'atoms';
// Organisms
import Card, { Separator } from 'organisms/Card';

// DashboardThinCard

const DashboardThinCard = ({ leftText, rightText, ...props }) => (
  <Card className='DashboardThinCard' styledFlex='center space-around' {...props}>
    <Box styledFlex='center center'>{leftText}</Box>
    <Separator />
    <Box styledFlex='center center'>{rightText}</Box>
  </Card>
);

DashboardThinCard.propTypes = {
  leftText: PropTypes.string.isRequired,
  rightText: PropTypes.string.isRequired,
};

DashboardThinCard.defaultProps = {
  leftText: null,
  rightText: null,
};

export default DashboardThinCard;