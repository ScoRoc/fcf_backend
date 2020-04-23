// Libraries
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Colors
import * as colors from './colors';

const inputBase = css`
  border: none;
  box-sizing: border-box;
  font-size: 12px;
  margin: auto;
  outline: none;
  padding: 15px;
  transition: all 100ms;
  width: 100%;

  &:focus {
    background-color: ${colors.offWhite};
  }

  &::selection {
    background-color: ${colors.greyMedium};
    color: ${colors.yellow};
  }
`;

// inputTheme

const inputTheme = {
  base: css`
    ${inputBase};
    border-bottom: 2px solid ${colors.black};
    color: ${colors.purple};
  `,
  error: css`
    ${inputBase};
    border-bottom: 2px solid ${colors.orange};
    color: ${colors.red};
  `,
  success: css`
    ${inputBase};
    border-bottom: 2px solid ${colors.purple};
    color: ${colors.green};
  `,
};

export default inputTheme;
