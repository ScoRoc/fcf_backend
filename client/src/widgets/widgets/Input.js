// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

// Input

const Input = ({ isRequired, onChange, size, type, value, ...props }) => {
  // State
  const [variant, setVariant] = useState('base');

  // Theme and Styles

  const theme = useTheme();
  const styles = buildStyles({ size, theme });

  // Return

  return (
    <input
      css={styles[variant]}
      onChange={onChange}
      required={isRequired}
      type={type}
      value={value}
      {...props}
    />
  );
};

const buildStyles = ({ size, theme }) => {
  const base = css`
    border: none;
    font-size: ${theme.sizes[size]};
    margin: auto;
    outline: none;
    padding: 5px;
    transition: all 100ms;

    &:focus {
      background-color: ${theme.colors.offWhite};
    }

    &::selection {
      background-color: ${theme.colors.greyMedium};
      color: ${theme.colors.yellow};
    }
  `;

  return {
    base: css`
      ${base};
      border-bottom: 2px solid ${theme.colors.black};
      color: ${theme.color};
    `,
    error: css`
      ${base};
      border-bottom: 2px solid ${theme.colors.orange};
      color: ${theme.color};
    `,
    success: css`
      ${base};
      border-bottom: 2px solid ${theme.colors.blue};
      color: ${theme.color};
    `,
  };
};

Input.propTypes = {
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['password', 'text']),
  value: PropTypes.string,
};

Input.defaultProps = {
  isRequired: false,
  onChange: null,
  size: 'sm',
  type: 'text',
  value: '',
};

export default Input;
