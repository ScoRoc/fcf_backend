import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.min.css';

import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import NewManager from './pages/new-manager/NewManager';

import Footer from './components/Footer';
import Header from './components/Header';

// const user = {
//   name: 'Scott',
// }
const user = false;

class App extends Component {

  render() {
    const firstPage = user ? <Home /> : <SignIn />;
    return (
      <Router>
        <div className="App">
          <Header />
          <NewManager />
          {firstPage}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
