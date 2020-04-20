// Libraries
import React, { useGlobal } from 'reactn';
// Theme
import { THEME_NAMES } from '../../theme/themes';

// ThemeToggle

const ThemeToggle = props => {
  // Global State

  const [themeName, setThemeName] = useGlobal('themeName');

  // Return

  return (
    <button
      onClick={() =>
        setThemeName(themeName === THEME_NAMES.MAIN ? THEME_NAMES.ALT : THEME_NAMES.MAIN)
      }
      {...props}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
