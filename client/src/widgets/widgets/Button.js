// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

// Button

const Button = ({ onClick, variant, ...props }) => {
  // Theme

  const theme = useTheme();

  // Styles

  const styles = buildStyles(theme);

  // Return

  return (
    <button css={styles[variant]} onClick={onClick} {...props}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
};

Button.defaultProps = {
  onClick: null,
  variant: 'primary',
};

const buildStyles = theme => ({
  primary: {
    backgroundColor: theme.colors.purple,
    color: theme.colors.orange,
  },
  secondary: {
    //
  },
  tertiary: {
    //
  },
});

export default Button;
