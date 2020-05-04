// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';
// Dashboard Organisms
import { DashboardBigCard, DashboardThinCard } from '../../organisms';

// DashboardTemplate

const DashboardTemplate = props => (
  <Box
    className='DashboardTemplate'
    css={{ boxSizing: 'border-box' }}
    display='grid'
    flex={1}
    gridGap='15px 15px'
    gridTemplateColumns='1fr 1fr'
    gridTemplateRows='1fr 1fr'
    height='100%'
    padding='30px 20px'
  >
    <DashboardBigCard
      bodyText='Card 1'
      className='dashboard-big-card'
      footerText='Card 1'
      gridColumn='1'
      gridRow='1'
      title='Card 1'
      icon='[icon]'
      text='Card 1'
    />

    <DashboardBigCard
      bodyText='Card 2'
      className='dashboard-big-card'
      footerText='Card 2'
      gridColumn='2'
      gridRow='1'
      title='Card 2'
      icon='[icon]'
      text='Card 2'
    />
    <DashboardBigCard
      bodyText='Card 3'
      className='dashboard-big-card'
      footerText='Card 3'
      gridColumn='1'
      gridRow='2'
      title='Card 3'
      icon='[icon]'
      text='Card 3'
    />
    <Box
      bg='transparent'
      className='dashboard-thin-card-container'
      gridColumn='2'
      gridRow='2'
      styledFlex='stretch space-between column'
    >
      <DashboardThinCard
        bg='darkslategrey'
        className='dashboard-thin-card'
        leftText='left'
        rightText='right'
      />
      <DashboardThinCard
        bg='darkslategrey'
        className='dashboard-thin-card'
        leftText='left'
        marginBottom='15px'
        marginTop='15px'
        rightText='right'
      />
      <DashboardThinCard
        bg='darkslategrey'
        className='dashboard-thin-card'
        leftText='left'
        rightText='right'
      />
    </Box>
  </Box>
);

export default DashboardTemplate;
