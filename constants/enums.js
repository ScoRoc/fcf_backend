const EVENT_TYPES = Object.freeze({
  COMMUNITY: 'community',
  COMPETITION: 'competition',
  SOCIAL: 'social',
});

const LOGIN_FROM = Object.freeze({
  APP: 'app',
  PORTAL: 'portal',
});
const LAST_LOGIN = Object.freeze({
  NONE: 'none',
  ...LOGIN_FROM,
});

const ROLES = Object.freeze({
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  USER: 'user',
});

module.exports = {
  EVENT_TYPES,
  LAST_LOGIN,
  LOGIN_FROM,
  ROLES,
};
