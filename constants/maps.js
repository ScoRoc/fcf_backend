const LAST_LOGIN = {
  APP: {
    key: 'APP',
    value: 'app',
  },
  NONE: {
    key: 'NONE',
    value: 'none',
  },
  PORTAL: {
    key: 'PORTAL',
    value: 'portal',
  },
};

const WODS = {
  CREATED_BY_USER: {
    PARAM: 'createdByUser',
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
};

module.exports = { LAST_LOGIN, WODS };
