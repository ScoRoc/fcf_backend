const API = {
  DEV: 'localhost:3001',
  PROD: 'FOOBAR',
};

const FULL_PATHS = {
  ANNOUNCEMENTS: '/app/announcements',
  APP: '/app',
  AUTH: '/auth',
  DASHBOARD: '/app/dashboard',
  EVENTS: '/app/events',
  LOGIN: '/login',
  ROOT: '/',
  USER: '/app/users/:id',
  USERS: '/app/users',
  WODS: '/app/wods',
};

const PATHS = {
  ANNOUNCEMENTS: '/announcements',
  APP: '/app',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  EVENTS: '/events',
  LOGIN: '/login',
  ROOT: '/',
  USERS: '/users',
  WODS: '/wods',
};

const QUERY_STRING = {
  CREATED_BY_USER_ID: {
    PARAM: {
      key: 'PARAM',
      value: 'createdByUserId',
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
  UPDATED_BY_USER_ID: {
    PARAM: {
      key: 'PARAM',
      value: 'updatedByUserId',
    },
  },
};

export { API, FULL_PATHS, PATHS, QUERY_STRING };
