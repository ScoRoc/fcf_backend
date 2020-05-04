// Libraries
import React from 'react';
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Custom Props
import systemProps from 'theme/system-props.js';

// TODO only keep items I'm usings
export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

const StyledP = styled('p', { shouldForwardProp })(
  // { background: 'yellow' },
  systemProps,
  ({ bold }) => bold && { fontWeight: 700 },
  ({ variant }) => variant === 'foo' && { fontSize: '50px' },
);

const Text = ({ children, ...props }) => (
  <StyledP margin={0} {...props}>
    {children}
  </StyledP>
);

export default Text;
