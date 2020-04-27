// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Components
import { BigCard, ThinCard } from 'components';
// Widgets
import { Box } from 'widgets';

// Dashboard

const Dashboard = props => (
  <Box
    className='Dashboard'
    css={{ boxSizing: 'border-box' }}
    display='grid'
    flex={1}
    gridGap='15px 15px'
    gridTemplateColumns='1fr 1fr'
    gridTemplateRows='repeat(2, auto)'
    height='100%'
    padding='30px 20px'
  >
    <BigCard
      bodyText='Card 1'
      footerText='Card 1'
      icon='[icon]'
      title='Card 1'
      className='dashboard-big-card'
      gridColumn='1'
      gridRow='1'
    />
    <BigCard
      bodyText='Card 2'
      footerText='Card 2'
      icon='[icon]'
      title='Card 2'
      className='dashboard-big-card'
      gridColumn='2'
      gridRow='1'
    />
    <BigCard
      bodyText='Card 3'
      footerText='Card 3'
      icon='[icon]'
      title='Card 3'
      className='dashboard-big-card'
      gridColumn='1'
      gridRow='2'
    />
    <Box
      bg='transparent'
      className='dashboard-thin-card-container'
      gridColumn='2'
      gridRow='2'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      <ThinCard
        bg='darkslategrey'
        className='dashboard-thin-card'
        leftText='left'
        rightText='right'
      />
      <ThinCard
        bg='darkslategrey'
        className='dashboard-thin-card'
        leftText='left'
        marginBottom='15px'
        marginTop='15px'
        rightText='right'
      />
      <ThinCard
        bg='darkslategrey'
        className='dashboard-thin-card'
        leftText='left'
        rightText='right'
      />
    </Box>
  </Box>
);

export default Dashboard;
