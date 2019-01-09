import { LOGIN, LOGOUT } from '../constants/action-types';

const initialState = {
  token: null,
  manager: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('fcf_backend', action.token);
      return {...state, token: action.token, manager: action.manager};
      break;
    case LOGOUT:
      localStorage.removeItem('fcf_backend');
      return {...initialState};
      break;
    default:
      return state;
  };
};

export default auth;
