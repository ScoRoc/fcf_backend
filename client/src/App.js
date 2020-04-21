// Libraries
import React, { addReducers, setGlobal, useGlobal } from 'reactn';
import { BrowserRouter as Router } from 'react-router-dom';
// Components
import AppRouter from './AppRouter';
// Themes
import { THEME_NAMES } from './theme/themes';

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
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
