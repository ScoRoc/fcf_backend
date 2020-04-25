// Libraries
import React from 'react';
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
// Custom Props
import systemProps from 'theme/systemProps.js';

// @jsx jsx
import { css, jsx } from '@emotion/core';

// TODO only keep items I'm usings
export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

export default styled('div', { shouldForwardProp })(
  { className: 'Box' },
  systemProps,
  (
    { custonPropName }, // write your own prop name and styles associated with it
  ) =>
    custonPropName &&
    css`
      padding-left: 50px;
      color: blue;

      &:hover {
        color: green;
      }
    `,
);
