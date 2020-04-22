// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
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

const buildStyles = theme => {
  const base = css`
    border: 2px solid ${theme.colors.purple};
    border-radius: 5px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    height: 35px;
    outline: none;
    transition: all 100ms;
    width: 100%;

    &:hover {
      background-color: ${theme.colors.purple};
    }

    &:active {
      background-color: rebeccapurple;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3) inset;
      transform: scale(0.95);
    }
  `;

  return {
    primary: css`
      ${base};
      background-color: ${theme.colors.white};
      color: ${theme.colors.orange};
    `,
    secondary: css`
      ${base};
    `,
    tertiary: css`
      ${base};
    `,
  };
};

export default Button;
