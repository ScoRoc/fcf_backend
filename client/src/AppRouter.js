// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Atoms
import { Box } from 'atoms';
// Pages
import Announcements from 'pages/Announcements';
import Dashboard from 'pages/Dashboard';
import Events from 'pages/Events';
import Users from 'pages/Users';
import Wods from 'pages/Wods';
// Organisms
import SideNav from 'organisms/SideNav';
// Utils
import { FULL_PATHS, PATHS } from 'utils/constants';

// Page

const Page = props => {
  // Global State

  const isUserAuthenticated = useGlobal('isUserAuthenticated');

  // Dispatchers

  const authenticateUser = useDispatch('authenticateUser');
  const logout = useDispatch('logout');
  const setUser = useDispatch('setUser');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Theme

  const theme = useTheme();

  // Effects

  useEffect(() => {
    axios
      .get(PATHS.AUTH)
      .then(res => {
        res.status === 200 ? handleSuccess(res) : handleErrors(res);
      })
      .catch(err => handleErrors(err));
  }, []);

  // Handle Fetch User Response

  const handleErrors = err => {
    // console.log('err: ', err);
    // console.log('if error, error.response: ', err.response);
    const { from } = location.state || { from: { pathname: PATHS.LOGIN } };
    logout();
    history.replace(from);
  };

  const handleSuccess = res => {
    console.log('res: ', res);
    // const to = `${FULL_PATHS.ANNOUNCEMENTS}`;
    // const to = `${FULL_PATHS.DASHBOARD}`;
    // const to = `${FULL_PATHS.EVENTS}`;
    const to = `${FULL_PATHS.USERS}`;
    // const to = `${FULL_PATHS.WODS}`;
    const { from } = location.state || { from: { pathname: to } };
    authenticateUser();
    history.replace(from);
    axios
      .get(`${PATHS.USERS}/${res.data._id}`)
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => handleErrors(err));
  };

  // Return

  return (
    <Route
      {...props}
      render={({ location }) =>
        !isUserAuthenticated ? (
          <Redirect to={{ pathname: FULL_PATHS.LOGIN, state: { from: location } }} />
        ) : (
          <Box
            className='Page'
            backgroundColor={theme.background}
            flex={1}
            margin={0}
            overflow='hidden'
            padding={0}
            styledFlex='stretch'
          >
            <SideNav />

            <Box className='PageBody' flex={1}>
              <Switch>
                <Route path={`${FULL_PATHS.DASHBOARD}`}>
                  <Dashboard />
                </Route>

                <Route path={`${FULL_PATHS.WODS}`}>
                  <Wods />
                </Route>

                <Route path={`${FULL_PATHS.ANNOUNCEMENTS}`}>
                  <Announcements />
                </Route>

                <Route path={`${FULL_PATHS.EVENTS}`}>
                  <Events />
                </Route>

                <Route path={`${FULL_PATHS.USERS}`}>
                  <Users />
                </Route>

                <Route exact path={FULL_PATHS.APP}>
                  <Dashboard />
                </Route>
              </Switch>
            </Box>
          </Box>
        )
      }
    />
  );
};

// CHANGE STRUCTURE AND NAMES SO ITS LIKE THIS

/* <Page>
  <Heaader>
    <Nav />
    <Profile />
  </Heaader>
  <Body>
    <Home>
      <Grid>
        <Announcement />
        <Event />
        <Wods />
        <Daily />
      </Grid>
    </Home>
    <Edit>
      <EditSection />
      <PhoneSection />
    </Edit>
    <Login>
      <Input />
    </Login>
    <Manager />
    <User />
    <Wods />
  </Body>
</Page>; */

// folders are lowerCamelCase
// component folders are lowerCamelCase
//    ~ usually singular
//    ~ plural if it contains multiple of something
//    ~ Components are singular and UpperCamelCase
// utils, themes, hooks, etc are plural and lowerCamelCase
//    ~ files inside them are lowerCamelCase and either singular or plural

export default Page;
