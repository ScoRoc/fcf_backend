// Libraries
import React, { addReducers, setGlobal, useGlobal } from 'reactn';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
// Components
import Login from 'pages/login/Login';
import Page from 'pages/Page';
// Widgets
import { Box } from 'widgets';
// Constants
import { URL } from 'constants/index';
// Themes
import themes, { THEME_NAMES } from 'theme/themes';

// Global State

setGlobal({
  cache: {},
  isLoading: false,
  isUserAuthenticated: false,
  themeName: THEME_NAMES.MAIN,
  user: null,
});

addReducers({
  authenticateUser: (globalState, dispatch) => ({ isUserAuthenticated: true }),
  clearUser: (globalState, dispatch) => ({ user: null }),
  deauthenticateUser: (globalState, dispatch) => ({ isUserAuthenticated: false }),
  login: async (globalState, dispatch, user) => {
    await dispatch.setUser(user);
    await dispatch.authenticateUser();
  },
  logout: async (globalState, dispatch) => {
    await dispatch.clearUser();
    await dispatch.deauthenticateUser();
  },
  setCache: (globalState, dispatch, { data, key }) => ({
    ...globalState.cache,
    cache: { [key]: data },
  }),
  setUser: (globalState, dispatch, user) => ({ user }),
  // updateUserCache: (globalState, dispatch, user) => ({ // Do I actually need this ???
  //   cache: {
  //     ...globalState.cache,
  //     [user._id]: user,
  //   },
  // }),
});

// App

function App() {
  const [themeName] = useGlobal('themeName');
  const theme = themes[themeName];

  return (
    <Box className='App' display='flex' height='100vh' width='100vw'>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path={URL.LOGIN}>
              <Login />
            </Route>

            <Route path={URL.APP}>
              <Page />
            </Route>

            <Redirect to={`${URL.APP}${URL.DASHBOARD}`} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Box>
  );
}

export default App;
