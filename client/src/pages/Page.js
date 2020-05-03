// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box, Text } from 'widgets';
// Pages
import AnnouncementsPage from './announcements/AnnouncementsPage';
import Dashboard from './dashboard/Dashboard';
import EventsPage from './events/EventsPage';
import WodsPage from './wod/WodsPage';
// Components
import { SideNav } from 'components';
// Constants
import { URL } from 'constants/index';

// Page

const Page = props => {
  // Global State

  const isUserAuthenticated = useGlobal('isUserAuthenticated');

  // Dispatchers

  const authenticateUser = useDispatch('authenticateUser');
  const logout = useDispatch('logout');
  const setUser = useDispatch('setUser');

  // History, Location, and Match

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch(URL.APP);
  // const match = useRouteMatch();
  // console.log('match: ', match);

  // Theme

  const theme = useTheme();

  // Effects

  useEffect(() => {
    // axios
    //   .get(URL.AUTH)
    //   .then(res => {
    //     res.status === 200 ? handleSuccess(res) : handleErrors(res);
    //   })
    //   .catch(err => handleErrors(err));
  }, []);

  // Handle Fetch User Response

  const handleErrors = err => {
    // console.log('err: ', err);
    // console.log('if error, error.response: ', err.response);
    const { from } = location.state || { from: { pathname: URL.LOGIN } };
    logout();
    history.replace(from);
  };

  const handleSuccess = res => {
    console.log('res: ', res);
    // const to = `${URL.APP}${URL.DASHBOARD}`;
    // const { from } = location.state || { from: { pathname: to } };
    authenticateUser();
    // history.replace(from);
    axios
      .get(`${URL.USERS}/${res.data._id}`)
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
          <Redirect to={{ pathname: URL.LOGIN, state: { from: location } }} />
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
                <Route path={`${match.path}${URL.DASHBOARD}`}>
                  <Dashboard />
                </Route>

                <Route path={`${match.path}${URL.WODS}`}>
                  <WodsPage />
                </Route>

                <Route path={`${match.path}${URL.ANNOUNCEMENTS}`}>
                  <AnnouncementsPage />
                </Route>

                <Route path={`${match.path}${URL.EVENTS}`}>
                  <EventsPage />
                </Route>

                <Route path={`${match.path}${URL.USERS}`}>
                  <Text>USERS PAGE</Text>
                </Route>

                <Route exact path={URL.APP}>
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
        <WodsPage />
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
    <WodsPage />
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
