// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Wods Components
import AddWod from './AddWod';
// Widgets
import { Box, Text } from 'widgets';
// Constants
import { URL } from 'constants/index';

// UsersPage

const UsersPage = props => {
  // Match

  const match = useRouteMatch(`${URL.APP}${URL.WODS}`);
  // console.log('match: ', match);

  // Return

  return (
    <Box className='UsersPage' flex={1} styledFlex='center flex-start column'>
      <Text>Users page</Text>
    </Box>
  );
};

UsersPage.propTypes = {
  //
};

UsersPage.defaultProps = {
  //
};

export default UsersPage;
