// Libraries
import React, { useGlobal, useState } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// REDUX TO GET RID OF \/ \/ \/ \/ \/
import { connect } from 'react-redux';
import { login } from '../../redux/modules/auth';
// CSS
import './Login.min.css';

const LoginPage = props => {
  // Global State
  const [user] = useGlobal('user');

  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message);
  };

  const handleSuccess = data => {
    console.log('success: ', data);
    const { manager, token } = data;
    login(manager, token);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const email = email.toLowerCase();
    axios.post('/manager/signin', { email, password }).then(result => {
      const { data } = result;
      data.errors ? handleErrors(data) : handleSuccess(data);
    });
  };

  // Redirect Home if session exists

  if (user.token) return <Redirect to="/home" />;

  // Return

  return (
    <div className="SignIn">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h3>Please Sign In</h3>
        <label htmlFor="new-manager-email">
          Email
          <br />
          <input id="new-manager-email" onChange={text => setEmail(text)} type="email" required />
        </label>
        <label htmlFor="new-manager-password">
          Password
          <br />
          <input
            id="new-manager-password"
            onChange={text => setPassword(text)}
            type="password"
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (manager, token) => dispatch(login(manager, token)),
  };
};

export default LoginPage;
