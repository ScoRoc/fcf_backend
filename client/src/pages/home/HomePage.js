// Libraries
import React, { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// CSS
import './Home.min.css';
// Constnats
import { URL } from '../../constants/url';

const HomePage = props => {
  // Global State
  const [user] = useGlobal('user');

  // If no token, go to LoginPage

  if (!user.token) return <Redirect to={URL.LOGIN} />;

  // Return

  return (
    <div className="Home">
      <p>home</p>
    </div>
  );
};

export default HomePage;
