// Libraries
import React, { useDispatch } from 'reactn';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
// Login Templates
import LoginTemplate from '../../templates';
// Utils
import { PATHS, QUERY_STRING } from 'utils/constants/urls';

// LoginLogic

const LoginLogic = () => {
  // Dispatchers
  const login = useDispatch('login');
  const logout = useDispatch('logout');

  // History and Location

  const history = useHistory();
  const location = useLocation();

  // Functions

  const handleErrors = res => {
    // console.log('res.data: ', res.data);
    // console.log('res.err: ', res.data._msg);
    logout();
  };

  const handleSuccess = res => {
    const to = `${PATHS.DASHBOARD}`;
    const { from } = location.state || { from: { pathname: to } };
    const { user } = res.data;
    login(user);
    history.replace(from);
  };

  const handleSubmit = ({ e, email, password }) => {
    e.preventDefault();
    axios
      .post(
        PATHS.AUTH,
        { email, password },
        {
          params: {
            [QUERY_STRING.LOGIN_FROM.PARAM]: QUERY_STRING.LOGIN_FROM.PORTAL,
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

  return <LoginTemplate handleSubmit={handleSubmit} />;
};

export default LoginLogic;
