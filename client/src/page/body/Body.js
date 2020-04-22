// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// Components
import AnnouncementsPage from '../../pages/announcement/AnnouncementsPage';
import EventsPage from '../../pages/event';
import HomePage from './home/Home';
import LoginPage from './login/Login';
import UsersPage from '../../pages/user';
import WodPage from '../../pages/wod';
// Constants
import { URL } from '../../constants/index';

// Body

const Body = props => {
  return (
    <>
      <Route exact path={URL.ROOT} component={HomePage} />
      <Route path={URL.ANNOUNCEMENTS} render={() => <AnnouncementsPage />} />
      <Route path={URL.EVENTS} render={() => <EventsPage />} />
      <Route path={URL.LOGIN} render={() => <LoginPage />} />
      <Route path={URL.USERS} render={() => <UsersPage />} />
      <Route path={URL.WODS} render={() => <WodPage />} />
    </>
  );
};

Body.propTypes = {
  //
};

Body.defaultProps = {
  //
};

export default Body;
