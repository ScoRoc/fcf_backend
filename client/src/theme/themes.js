// Colors
import * as colors from './colors';
// Themes
import inputTheme from './input-theme';
import textTheme from './text-theme';

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
    color: {
      primary: colors.black,
      secondary: colors.white,
      tertiary: colors.yellow,
    },
    colors,
    background: colors.white,
    input: inputTheme,
    modalBackgroundColor: 'papayawhip',
    sizes: {
      sm: '1rem',
      md: '2rem',
      lg: '3rem',
    },
    text: textTheme,
  },
};

export default themes;
