// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
import { variant } from 'styled-system';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Custom Props
import systemProps from 'theme/system-props.js';

// TODO only keep items I'm usings
// export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];
export const forwardedProps = [...props, 'cursor'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

const baseStyle = css`
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  outline: none;
  padding: 5px 10px;
  transition: all 100ms;

  &:active {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3) inset;
    transform: scale(0.95);
  }
`;

const StyledButton = styled('button', { shouldForwardProp })(
  { className: 'StyledButton', cursor: 'pointer' },
  variant({
    variants: {
      primary: css`
        ${baseStyle}
      `,
      secondary: css`
        ${baseStyle}
        border-radius: 50%;
      `,
      tertiary: css`
        ${baseStyle}
      `,
    },
  }),
  systemProps,
);

const Button = ({ children, variant, ...props }) => {
  const theme = useTheme();

  const colors = {
    primary: theme.colors.purple,
    secondary: theme.colors.green,
    tertiary: theme.colors.orange,
  };

  return (
    <StyledButton
      className='Button'
      css={css`
        border: 2px solid ${theme.colors.purple};

        &:hover {
          background-color: ${colors[variant]};
        }

        &:active {
          background-color: ${theme.colors.yellow};
        }
      `}
      variant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
