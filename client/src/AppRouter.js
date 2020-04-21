// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation, Route } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
// Components
import AddManagerPage from './pages/managers/AddManagerPage';
import AnnouncementsPage from './pages/announcements/AnnouncementsPage';
import DisplayedManagerPage from './pages/managers/DisplayedManagerPage';
import DisplayedUserPage from './pages/users/DisplayedUserPage';
import EventsPage from './pages/events/EventsPage';
import Footer from './page-sections/Footer';
import Header from './page-sections/Header';
import HomePage from './pages/home/HomePage';
// import Main from './page-sections/Main';
import ManagersPage from './pages/managers/ManagersPage';
import LoginPage from './pages/login/LoginPage';
import UsersPage from './pages/users/UsersPage';
import WodPage from './pages/wod/WodPage';
// Constants
import { URL } from './constants/index';
// Themes
import themes, { THEME_NAMES } from './theme/themes';

// AppRouter

function AppRouter() {
  // Global State

  const [themeName] = useGlobal('themeName');

  // Dispatchers

  const authenticateUser = useDispatch('authenticateUser');
  const logout = useDispatch('logout');
  const setUser = useDispatch('setUser');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Effects

  useEffect(() => {
    axios
      .get(URL.AUTH)
      .then(res => {
        res.status === 200 ? handleSuccess(res) : handleErrors(res);
      })
      .catch(err => handleErrors(err));
  }, []);

  // Handle Fetch User Response

  const handleErrors = err => {
    // console.log('response: ', err);
    // console.log('if error, error.response: ', err.response);
    const { from } = location.state || { from: { pathname: URL.LOGIN } };
    logout();
    history.replace(from);
  };

  const handleSuccess = res => {
    console.log('res: ', res);
    const { from } = location.state || { from: { pathname: URL.ROOT } };
    authenticateUser();
    history.replace(from);
    axios
      .get(`${URL.USERS}/${res.data._id}`)
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => handleErrors(err));
  };

  // Theme

  const theme = themes[themeName];

  // Styles

  const styles = buildStyles(theme);

  // Return

  return (
    <ThemeProvider theme={theme}>
      <div className='App' css={styles.app}>
        <Route exact path={URL.ROOT} component={HomePage} />
        <Route path={URL.ANNOUNCEMENTS} render={() => <AnnouncementsPage />} />
        <Route path={URL.EVENTS} render={() => <EventsPage />} />
        <Route path={URL.LOGIN} render={() => <LoginPage />} />
        <Route path={URL.USERS} render={() => <UsersPage />} />
        <Route path={URL.WODS} render={() => <WodPage />} />
      </div>
    </ThemeProvider>
  );
}

const buildStyles = theme => ({
  app: {
    backgroundColor: theme.background,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 0,
    padding: 0,
  },
});

export default AppRouter;
