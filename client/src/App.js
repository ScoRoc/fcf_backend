// Libraries
import React, { addReducers, setGlobal, useGlobal } from 'reactn';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
// Components
import Login from 'pages/Login';
import AppRouter from './AppRouter';
// Atoms
import { Box } from 'atoms';
// Constants
import { PATHS, QUERY_STRING } from 'utils/constants';
// Themes
import themes, { THEME_NAMES } from 'theme/themes';

// Global State

setGlobal({
  cache: {},
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
  removeWod: async (globalState, dispatch, _id) => {
    const cachedWods = globalState.cache.wods;
    delete cachedWods.data[_id];
    await dispatch.setCache({ data: cachedWods, key: 'wods' });

    const { wods } = globalState;
    delete wods.data[_id];
    return { wods };
  },
  setCache: (globalState, dispatch, { data, key }) => ({
    cache: { ...globalState.cache, [key]: data },
  }),
  setUser: async (globalState, dispatch, user) => {
    await dispatch.setCache({ data: user, key: 'user' });
    return { user };
  },
  setWod: async (globalState, dispatch, { direction = QUERY_STRING.DIRECTION.DESC.value, wod }) => {
    console.log('wod in setWod: ', wod);
    return {
      wods: {
        data: { ...globalState.wods.data, [wod._id]: wod },
        direction,
        // wods:
        // direction === QUERY_STRING.DIRECTION.DESC.value
        //   ? [wod, ...globalState.wods.data]
        //   : [...globalState.wods.data, wod],
      },
    };
  },
  setWods: async (
    globalState,
    dispatch,
    { data, direction = QUERY_STRING.DIRECTION.DESC.value },
  ) => {
    const wodData = data.reduce((wods, wod) => {
      wods[wod._id] = wod;
      return wods;
    }, {});
    const newWodsState = {
      ...globalState.wods,
      data: wodData,
      direction: direction || globalState.wods.direction,
    };
    await dispatch.setCache({ data: newWodsState, key: 'wods' });
    return { wods: newWodsState };
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
