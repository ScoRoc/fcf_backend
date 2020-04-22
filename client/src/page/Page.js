// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
// Body
import Body from './body/Body';
// Components
import AddManagerPage from '../pages/manager/AddManagerPage';
import DisplayedManagerPage from '../pages/manager/DisplayedManagerPage';
import DisplayedUserPage from '../pages/user/DisplayedUserPage';
import Footer from '../page-sections/Footer';
import Header from '../page-sections/Header';
// import Main from './page-sections/Main';
import ManagersPage from '../pages/manager/ManagersPage';
// Themes
import themes, { THEME_NAMES } from '../theme/themes';
// Constants
import { URL } from 'constants/index';

// Page

function Page() {
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
    // console.log('err: ', err);
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
      <div className='Page' css={styles.app}>
        {/* <Header /> */}
        {/* <Sidebar /> */}

        <Body />

        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

// buildStyles

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

// CHANGE STRUCTURE AND NAMES SO ITS LIKE THIS
{
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
        <Wod />
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
    <Wod />
  </Body>
</Page>; */
}

// folders are lowerCamelCase
// component folders are lowerCamelCase
//    ~ usually singular
//    ~ plural if it contains multiple of something
//    ~ Components are singular and UpperCamelCase
// utils, themes, hooks, etc are plural and lowerCamelCase
//    ~ files inside them are lowerCamelCase and either singular or plural

export default Page;
