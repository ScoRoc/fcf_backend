// Colors
import * as colors from './colors';

// theme names
export const THEME_NAMES = {
  ALT: 'alt',
  MAIN: 'main',
};

// themes

const themes = {
  alt: {
    color: 'red',
    colors,
    background: colors.green,
    modalBackgroundColor: 'purple',
    sizes: {
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
    },
  },
  main: {
    color: colors.black,
    colors,
    background: colors.darkGrey,
    modalBackgroundColor: colors.white,
    sizes: {
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
    },
  },
};

export default themes;
