export const LIFT_MANAGER_TO_DISPLAY = 'fcf_backend/auth/LIFT_MANAGER_TO_DISPLAY';

const initialState = {
  manager: null,
};

export function liftManagerToDisplay(displayedManager) {
  return {
    type: LIFT_MANAGER_TO_DISPLAY,
    displayedManager,
  };
};

export default function displayedManager(state = initialState, action = {}) {
  switch (action.type) {
    case LIFT_MANAGER_TO_DISPLAY:
      return {...state, manager: action.displayedManager};
    default:
      return state;
  }
};
