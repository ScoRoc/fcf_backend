import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, logout } from './redux/modules/auth';

import './App.min.css';
import HomePage from './pages/home/HomePage';
import SignInPage from './pages/signin/SignInPage';
import AnnouncementsPage from './pages/announcements/AnnouncementsPage';
import EventsPage from './pages/events/EventsPage';
import WodPage from './pages/wod/WodPage';
import UsersPage from './pages/users/UsersPage';
import DisplayedUserPage from './pages/users/DisplayedUserPage';
import AddManagerPage from './pages/new-manager/AddManagerPage';

import Footer from './page-sections/Footer';
// import Main from './page-sections/Main';
import Header from './page-sections/Header';
import LoadingFirstPage from './components/LoadingFirstPage';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const token = localStorage.getItem('fcf_backend');
    if (token === 'undefined' || !token) {
      this.props.logout();

    } else {
      axios.post('/manager/validate', {token}).then(result => {
        const { data } = result;
        const { manager, token } = data;
        this.props.login(manager, token);
      }).catch(err => console.log('err: ', err));
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          {/* <AddManagerPage /> */}
          {/* <Main manager={manager} liftManager={this.liftManager} /> */}
          <main className='main flex1'>
            <Route exact path='/' render={() => <LoadingFirstPage />} />
            <Route path='/home' render={() => <HomePage />} />
            <Route path='/announcements' render={() => <AnnouncementsPage />} />
            <Route path='/events' render={() => <EventsPage />} />
            <Route path='/wod' render={() => <WodPage />} />
            <Route path='/users' render={() => <UsersPage />} />
            <Route path='/user' render={() => (
              <DisplayedUserPage displayedUser={this.props.displayedUser} />
            )} />
            <Route path='/addmanager' render={() => <AddManagerPage />} />
            <Route path='/signin' render={() => <SignInPage />} />
          </main>
          {/* <Main /> */}
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
    displayedUser: state.displayedUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (manager, token) => dispatch(login(manager, token)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
