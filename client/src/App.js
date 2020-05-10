// Libraries
import React, { addReducers, setGlobal, useGlobal } from 'reactn';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
// Components
import Login from 'pages/Login';
import AppRouter from './AppRouter';
// Atoms
import { Box } from 'atoms';
// Reducers
import announcementReducers from 'pages/Announcements/logic/AnnouncementsLogic/reducers';
import eventReducers from 'pages/Events/logic/EventsLogic/reducers';
import wodReducers from 'pages/Wods/logic/WodsLogic/reducers';
// Constants
import { PATHS } from 'utils/constants';
// Themes
import themes, { THEME_NAMES } from 'theme/themes';

// Global State

setGlobal({
  announcements: {
    data: [],
  },
  cache: {},
  events: {
    data: [],
  },
  isLoading: false,
  isUserAuthenticated: false,
  themeName: THEME_NAMES.MAIN,
  user: null,
  wods: {
    data: [],
    direction: 'desc',
  },
});

addReducers({
  ...announcementReducers,
  ...eventReducers,
  ...wodReducers,
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
    cache: { ...globalState.cache, [key]: data },
  }),
  setUser: async (globalState, dispatch, user) => {
    await dispatch.setCache({ data: user, key: 'user' });
    return { user };
  },
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
            <Route exact path={PATHS.LOGIN}>
              <Login />
            </Route>

            <Route path={PATHS.APP}>
              <AppRouter />
            </Route>

            <Redirect to={`${PATHS.APP}${PATHS.DASHBOARD}`} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Box>
  );
}

export default App;
