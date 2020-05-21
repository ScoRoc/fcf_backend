const EVENT_TYPES = Object.freeze({
  COMMUNITY: 'community',
  COMPETITION: 'competition',
  SOCIAL: 'social',
});

const IMG_UPDATE = Object.freeze({
  CROP: 'crop',
  NEW_IMG: 'new-img',
  NONE: 'none',
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
  IMG_UPDATE,
  LOGIN_FROM,
  ROLES,
};
