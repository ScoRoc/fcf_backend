export const LOGIN = 'fcf_backend/auth/LOGIN';
export const LOGOUT = 'fcf_backend/auth/LOGOUT';

const initialState = {
  token: null,
  manager: null,
};

export function login(manager, token) {
  return {
    type: LOGIN,
    manager,
    token,
  };
}

export function logout() {
  return { type: LOGOUT };
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      // localStorage.setItem('fcf_backend', action.token);
      return { ...state, token: action.token, manager: action.manager };
    case LOGOUT:
      // localStorage.removeItem('fcf_backend');
      return { ...initialState };
    default:
      return state;
  }
}
