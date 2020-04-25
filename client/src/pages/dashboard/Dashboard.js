// Libraries
import React, { useDispatch, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Components
import { Card } from 'components';
// Widgets
import { Box, Text } from 'widgets';

// Dashboard

const Dashboard = props => {
  // Global State
  const [user] = useGlobal('user');

  // Dispathers
  const logout = useDispatch('logout');

  // History, Location, and Match

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  // Theme and Styles

  const theme = useTheme();
  const styles = buildStyles(theme);

  // Return

  return (
    <Box
      className='Dashboard'
      // display='flex'
      flex={1}
      height='100%'
      // justifyContent='space-between'
      // padding='35px 20px'

      display='grid'
      gridGap='20px 20px'
      gridTemplateColumns='2fr 50fr 1fr 50fr 2fr'
      gridTemplateRows='2fr 3fr 1fr 3fr 2fr'
      height='100%'
      paddingTop='30px'
    >
      <Card gridColumn='2' gridRow='1' margin='0 10px' />
      <Card gridColumn='4' gridRow='1' margin='0 10px' />
      <Card gridColumn='2' gridRow='2' margin='0 10px' />
      <Card
        bg='transparent'
        gridColumn='4'
        gridRow='2'
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='space-between'
        margin='0 10px'
      >
        <Card bg='darkslategrey' height='29%' />
        <Card bg='darkslategrey' height='29%' />
        <Card bg='darkslategrey' height='29%' />
      </Card>
    </Box>
  );
};

const buildStyles = theme => ({
  p: {
    // color: theme.color,
    // color: theme.colors.white,
  },
});

export default Dashboard;
