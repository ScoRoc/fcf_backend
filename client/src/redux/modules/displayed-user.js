export const LIFT_USER_TO_DISPLAY = 'fcf_backend/auth/LIFT_USER_TO_DISPLAY';

const initialState = {
  user: null,
};

export function liftUserToDisplay(displayedUser) {
  return {
    type: LIFT_USER_TO_DISPLAY,
    displayedUser,
  };
};

export default function displayedUser(state = initialState, action = {}) {
  switch (action.type) {
    case LIFT_USER_TO_DISPLAY:
      return {...state, user: action.displayedUser};
    default:
      return state;
  }
};
