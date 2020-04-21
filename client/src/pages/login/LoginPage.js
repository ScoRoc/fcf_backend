// Libraries
import React, { useDispatch, useState } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Button, Text, ThemeToggle } from '../../widgets/index';
// Constants
import { QUERY_STRING, URL } from '../../constants/index';

// LoginPage

const LoginPage = props => {
  // Dispatchers
  const login = useDispatch('login');
  const logout = useDispatch('logout');

  // State
  const [email, setEmail] = useState('super@super.com');
  const [password, setPassword] = useState('password');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Theme

  const theme = useTheme();

  // Functions

  const handleErrors = res => {
    // console.log('res.data: ', res.data);
    // console.log('res.err: ', res.data._msg);
    logout();
  };

  const handleSuccess = res => {
    const { from } = location.state || { from: { pathname: URL.ROOT } };
    const { user } = res.data;
    login(user);
    history.replace(from);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        URL.AUTH,
        { email, password },
        {
          params: {
            loginFrom: QUERY_STRING.LOGIN_FROM,
          },
        },
      )
      .then(res => {
        console.log('res: ', res);
        res.status === 200 ? handleSuccess(res) : handleErrors(res);
      })
      .catch(err => {
        console.error(err);
        handleErrors(err);
      });
  };

  // Styles

  const styles = buildStyles(theme);

  // Return

  return (
    <div css={styles.page}>
      <div css={styles.box}>
        <ThemeToggle />
        <Text size='lg'>Administration Portal</Text>
        <form css={styles.form} onSubmit={handleSubmit}>
          <label css={styles.label} htmlFor='login-email'>
            <Text size='sm'>Email</Text>
            <input
              css={styles.input}
              onChange={e => setEmail(e.target.value)}
              required
              type='email'
              value={email}
            />
          </label>
          <label css={styles.label} htmlFor='login-password'>
            <Text size='sm'>Password</Text>
            <input
              css={styles.input}
              onChange={e => setPassword(e.target.value)}
              required
              type='password'
              value={password}
            />
          </label>
          <Button css={styles.button} type='submit'>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

const buildStyles = theme => ({
  box: {
    // backgroundColor: theme.colors.white,
    backgroundColor: theme.modalBackgroundColor,
    padding: '20px',
  },
  button: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    color: theme.color,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  page: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
});

LoginPage.propTypes = {
  //
};

LoginPage.defaultProps = {
  //
};

export default LoginPage;
