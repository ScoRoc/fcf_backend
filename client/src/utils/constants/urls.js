const API = {
  DEV: 'localhost:3001',
  PROD: 'FOOBAR',
};

const PATHS = {
  ANNOUNCEMENTS: '/announcements',
  APP: '/app',
  ADD: '/add',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  EVENTS: '/events',
  LOGIN: '/login',
  ROOT: '/',
  USERS: '/users',
  WODS: '/wods',
};

const QUERY_STRING = {
  CREATED_BY_USER: {
    PARAM: {
      key: 'PARAM',
      value: 'createdByUser',
    },
  },
  DIRECTION: {
    ASC: {
      key: 'ASC',
      value: 'asc',
    },
    DESC: {
      key: 'DESC',
      value: 'desc',
    },
    PARAM: {
      key: 'PARAM',
      value: 'direction',
    },
  },
  LOGIN_FROM: {
    APP: 'app',
    PARAM: 'loginFrom',
    PORTAL: 'portal',
  },
  UPDATED_BY_USER: {
    PARAM: {
      key: 'PARAM',
      value: 'updatedByUser',
    },
  },
};

export { API, PATHS, QUERY_STRING };
