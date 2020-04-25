const SET_PAGE = 'fcf_backend/pages/SET_PAGE';

const initialState = {
  page: '/',
};

export default function pages(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PAGE:
      return {...state, page: action.page};
    default:
      return state;
  }
};

export function setPage(page) {
  return { type: SET_PAGE, page };
};
