// Libraries
import React, { forwardRef } from 'react';
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

const StyledTextArea2 = styled('textarea', { shouldForwardProp })(
  { className: 'StyledTextArea' },
  css`
    box-sizing: border-box;
    font-size: 16px;
    outline: none;
    padding: 15px;
    width: 100%;
  `,
  systemProps,
);

const StyledTextArea = forwardRef((props, ref) => <StyledTextArea2 ref={ref} {...props} />);

export default StyledTextArea;
