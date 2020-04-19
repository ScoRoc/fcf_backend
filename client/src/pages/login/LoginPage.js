// Libraries
import React, { useGlobal, useState } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// PLACEHOLDER
const login = () => console.log('login placeholder...');

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
    <div style={styles.page}>
      <h1>Administration Portal</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    //
  },
};

LoginPage.propTypes = {
  //
};

LoginPage.defaultProps = {
  //
};

export default LoginPage;
