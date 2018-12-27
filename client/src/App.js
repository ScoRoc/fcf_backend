import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './App.min.css';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import Main from './components/Main';
import NewManager from './pages/new-manager/NewManager';

import Footer from './components/Footer';
import Header from './components/Header';

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
    if (!token) {
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
          {/* <NewManager /> */}
          <Main manager={manager} liftManager={this.liftManager} />
          {/* <main className='main flex1'>
            <Route path='/home' render={() => <Home manager={manager} />} />
            <Route path='/signin' render={() => <SignIn manager={manager} liftManager={this.liftManager} />} />
          </main> */}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
