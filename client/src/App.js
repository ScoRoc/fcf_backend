// Libraries
import React, { setGlobal, useEffect, useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import { URL } from './constants/url';

// Global State

setGlobal({
  user: {},
});

const login = () => console.log('fake logging in...');
const logout = () => console.log('fake logging out...');

// App

function App() {
  // Global State

  const { user, setUser } = useGlobal('user');

  // Effects

  useEffect(() => {
    const token = localStorage.getItem('fcf_backend');
    if (!token) logout();

    axios
      .post(URL.VALIDATE_USER, { token })
      .then(result => {
        const { data } = result;
        const { user } = data;
        login(user);
      })
      .catch(err => console.log('err: ', err));
  }, []);

  // Return

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        {/* <main className="main flex1"> */}

        <Route exact path={URL.ROOT} component={HomePage} />
        <Route path={URL.ANNOUNCEMENTS} render={() => <AnnouncementsPage />} />
        <Route path={URL.EVENTS} render={() => <EventsPage />} />
        <Route path={URL.LOGIN} render={() => <LoginPage />} />
        <Route path={URL.USERS} render={() => <UsersPage />} />
        <Route path={URL.WODS} render={() => <WodPage />} />

        {/* <Route
            path="/user"
            render={() => (
              <DisplayedUserPage
                displayedUser={this.props.displayedUser}
                superUser={this.props.manager.superUser}
              />
            )}
          />
          <Route path="/managers" render={() => <ManagersPage />} />
          <Route
            path="/manager"
            render={() => (
              <DisplayedManagerPage
                displayedManager={this.props.displayedManager}
                superUser={this.props.manager.superUser}
              />
            )}
          />
          <Route path="/add-manager" render={() => <AddManagerPage />} />
          <Route path="/signin" render={() => <SignInPage />} /> */}
        {/* </main> */}
        {/* <Main /> */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
