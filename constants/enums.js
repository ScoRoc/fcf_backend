const EVENT_TYPES = Object.freeze({
  COMMUNITY: 'community',
  COMPETITION: 'competition',
  SOCIAL: 'social',
});

const LAST_LOGIN = Object.freeze({
  APP: 'app',
  NONE: 'none',
  PORTAL: 'portal',
});

const ROLES = Object.freeze({
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  USER: 'user',
});

module.exports = {
  EVENT_TYPES,
  LAST_LOGIN,
  ROLES,
};
