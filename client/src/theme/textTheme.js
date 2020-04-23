// Libraries
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Colors
import * as colors from './colors';

const textBase = css`
  margin: 0;
`;

// inputTheme

const textTheme = {
  base: css`
    ${textBase};
    color: ${colors.purple};
  `,
  // error: css`
  //   ${textBase};
  //   border-bottom: 2px solid ${colors.orange};
  //   color: ${colors.red};
  // `,
  // success: css`
  //   ${textBase};
  //   border-bottom: 2px solid ${colors.purple};
  //   color: ${colors.green};
  // `,
};

export default textTheme;
