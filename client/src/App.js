import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.min.css';
import HomePage from './pages/home/HomePage';
import SignInPage from './pages/signin/SignInPage';
import AnnouncementsPage from './pages/announcements/AnnouncementsPage';
import EventsPage from './pages/events/EventsPage';
import WodPage from './pages/wod/WodPage';
import AddManagerPage from './pages/new-manager/AddManagerPage';

import Footer from './components/Footer';
// import Main from './components/Main';
import Header from './components/Header';
import LoadingFirstPage from './components/LoadingFirstPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      manager: null,
      token: null,
    };
    this.state = this.defaultState;
  }

  liftManager = data => {
    const { manager, token } = data;
    this.setState({ manager, token });
  }

  logout = () => {
    localStorage.removeItem('fcf_backend');
    this.setState(this.defaultState);
  }

  componentDidMount() {
    const token = localStorage.getItem('fcf_backend');
    if (token === 'undefined' || !token) {
      localStorage.removeItem('fcf_backend');
      this.logout();
    } else {
      axios.post('/manager/validate', {token}).then(result => {
        const { data } = result;
        localStorage.setItem('fcf_backend', data.token);
        this.setState({ manager: data.manager, token: data.token });
      }).catch(err => console.log('err: ', err));
    }
  }

  render() {
    const { manager } = this.state;
    return (
      <Router>
        <div className="App">
          <Header logout={this.logout} manager={manager} />
          {/* <AddManagerPage /> */}
          {/* <Main manager={manager} liftManager={this.liftManager} /> */}
          <main className='main flex1'>
            <Route exact path='/' render={() => <LoadingFirstPage />} />
            <Route path='/home' render={() => <HomePage manager={manager} />} />
            <Route path='/announcements' render={() => <AnnouncementsPage />} />
            <Route path='/events' render={() => <EventsPage />} />
            <Route path='/wod' render={() => <WodPage />} />
            <Route path='/addmanager' render={() => <AddManagerPage />} />
            <Route path='/signin' render={() => <SignInPage manager={manager} liftManager={this.liftManager} />} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
