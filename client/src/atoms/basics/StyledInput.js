// Libraries
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
import { variant } from 'styled-system';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Custom Props
import systemProps from 'theme/system-props';

// TODO only keep items I'm usings
// export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];
const forwardedProps = [...props, 'cursor'];

const shouldForwardProp = createShouldForwardProp(forwardedProps);

const baseStyle = css`
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  padding: 15px;
  padding-right: 40px;
  width: 100%;
`;

const StyledInput = styled('input', { shouldForwardProp })(
  { className: 'StyledInput' },
  variant({
    variants: {
      error: css`
        ${baseStyle}
      `,
      primary: css`
        ${baseStyle}
      `,
      success: css`
        ${baseStyle}
      `,
    },
  }),
  systemProps,
);

export default StyledInput;
