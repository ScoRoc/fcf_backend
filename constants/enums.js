const EVENT_TYPES = Object.freeze({
  COMMUNITY: 'community',
  COMPETITION: 'competition',
  SOCIAL: 'social',
});

const LOGIN_FROM = Object.freeze({
  APP: 'app',
  PORTAL: 'portal',
});

const ROLES = Object.freeze({
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  USER: 'user',
});

module.exports = {
  EVENT_TYPES,
  LOGIN_FROM,
  ROLES,
};
