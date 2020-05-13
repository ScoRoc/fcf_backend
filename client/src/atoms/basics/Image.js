// Libraries
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
// Custom Props
import systemProps from 'theme/system-props.js';

// @jsx jsx
import { css, jsx } from '@emotion/core';

// TODO only keep items I'm usings
export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

const Image = styled('img', { shouldForwardProp })({ className: 'Image' }, systemProps);

export default Image;
