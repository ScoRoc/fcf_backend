// Libraries
import React, { useDispatch, useState } from 'reactn';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Parts
import LoginInput from './LoginInput';
// Widgets
import { Button, Text } from 'widgets';
import { ThemeToggle } from 'components';
// Constants
import { QUERY_STRING, URL } from 'constants/urls';

// Login

const Login = props => {
  // Dispatchers
  const login = useDispatch('login');
  const logout = useDispatch('logout');

  // State
  const [email, setEmail] = useState('super@super.com');
  const [password, setPassword] = useState('password');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyles(theme);

  // Functions

  const handleErrors = res => {
    // console.log('res.data: ', res.data);
    // console.log('res.err: ', res.data._msg);
    logout();
  };

  const handleSuccess = res => {
    const to = `${URL.APP}${URL.DASHBOARD}`;
    const { from } = location.state || { from: { pathname: to } };
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

  // Return

  return (
    <div className='Login' css={styles.page}>
      <div css={styles.loginBox}>
        <ThemeToggle />
        <Text css={styles.title} size='lg'>
          Administration Portal
        </Text>
        <div css={styles.logo} />

        <form css={styles.form} onSubmit={handleSubmit}>
          <LoginInput label='Email' onChange={e => setEmail(e.target.value)} value={email} />
          <LoginInput
            label='Password'
            onChange={e => setPassword(e.target.value)}
            style={{ margin: '0 auto' }}
            value={password}
          />

          <Button css={styles.button} type='submit'>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

const buildStyles = theme => ({
  button: {
    marginTop: '40px',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  loginBox: css`
    background-color: ${theme.modalBackgroundColor};
    flex: 1;
    max-height: 70%;
    padding: 40px 100px;
    width: 50vw;

    @media only screen and (min-width: 1250px) {
      ${'' /* padding: 40px 20%; */}
    }

    @media only screen and (min-width: 600px) and (max-width: 850px) {
      ${'' /* padding: 30px 10px; */}
    }
  `,
  logo: {
    backgroundColor: theme.colors.yellow,
    borderRadius: '50%',
    height: '80px',
    margin: '30px auto',
    width: '80px',
  },
  page: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
  title: {
    // marginBottom:
  },
});

Login.propTypes = {
  //
};

Login.defaultProps = {
  //
};

export default Login;
