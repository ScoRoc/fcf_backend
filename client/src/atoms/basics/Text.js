// Libraries
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
// @jsx jsx
import { jsx } from '@emotion/core';
// Custom Props
import systemProps from 'theme/system-props.js';

// TODO only keep items I'm usings
export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

const Text = styled('p', { shouldForwardProp })(
  { margin: '0' },
  systemProps,
  ({ bold }) => bold && { fontWeight: 700 },
  ({ variant }) => variant === 'foo' && { fontSize: '50px' },
);

export default Text;
