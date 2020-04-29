// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Wod Screens
import AddWod from './AddWod';
import ViewWods from './ViewWods';
// Widgets
import { Box } from 'widgets';
// Constants
import { URL } from 'constants/index';

// Wod

const Wod = props => {
  // Match

  const match = useRouteMatch(`${URL.APP}${URL.WODS}`);
  // console.log('match: ', match);

  // Return

  return (
    <Box
      alignItems='center'
      className='Wod'
      display='flex'
      flex={1}
      flexDirection='column'
      height='100%'
    >
      <Switch>
        <Route path={`${match.path}${URL.ADD}`}>
          <AddWod />
        </Route>

        <Route path={match.path}>
          <ViewWods />
        </Route>
      </Switch>
    </Box>
  );
};

Wod.propTypes = {
  //
};

Wod.defaultProps = {
  //
};

export default Wod;
