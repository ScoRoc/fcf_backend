// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import Modal from 'organisms/Modal';
// Utils
import { PATHS } from 'utils/constants';

// UsersTemplate

const UsersTemplate = props => {
  // Match

  const match = useRouteMatch(`${PATHS.APP}${PATHS.WODS}`);
  // console.log('match: ', match);

  // Return

  return (
    <Box className='UsersTemplate' flex={1} styledFlex='center flex-start column'>
      <Text>Users page</Text>
    </Box>
  );
};

UsersTemplate.propTypes = {
  //
};

UsersTemplate.defaultProps = {
  //
};

export default UsersTemplate;
