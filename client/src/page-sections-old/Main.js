import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import '../App.min.css';
import HomePage from '../pages/home/HomePage';
import SignInPage from '../pages/signin/SignInPage';
import AnnouncementsPage from '../pages/announcements/AnnouncementsPage';
import EventsPage from '../pages/events/EventsPage';
import WodPage from '../pages/wod/WodPage';
import AddManagerPage from '../pages/new-manager/AddManagerPage';

import LoadingFirstPage from '../components/LoadingFirstPage';

class Main extends Component {

  render() {
    return (
      <main className='main flex1'>
        {/* <AddManagerPage /> */}
        {/* <Main manager={manager} liftManager={this.liftManager} /> */}
        <Route exact path='/' render={() => <LoadingFirstPage />} />
        <Route path='/home' render={() => <HomePage />} />
        <Route path='/announcements' render={() => <AnnouncementsPage />} />
        <Route path='/events' render={() => <EventsPage />} />
        <Route path='/wod' render={() => <WodPage />} />
        <Route path='/addmanager' render={() => <AddManagerPage />} />
        <Route path='/signin' render={() => <SignInPage />} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Main);
