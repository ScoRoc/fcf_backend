import { LOGIN } from '../constants/action-types';
import { LOGOUT } from '../constants/action-types';

export const login = (manager, token) => (
  {
    type: LOGIN,
    manager,
    token,
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);
