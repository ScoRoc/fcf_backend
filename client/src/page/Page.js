// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
// Pages
import Home from './home/Home';
import Login from './login/Login';
// Themes
import themes from 'theme/themes';
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

  // Styles and Theme

  const theme = themes[themeName];
  const styles = buildStyles(theme);

  // Return

  return (
    <ThemeProvider theme={theme}>
      <div className='Page' css={styles.page}>
        <Route exact path={URL.ROOT} component={Home} />
        <Route path={URL.LOGIN} render={() => <Login />} />
      </div>
    </ThemeProvider>
  );
}

// buildStyles

const buildStyles = theme => ({
  page: {
    backgroundColor: theme.background,
    display: 'flex',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
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
