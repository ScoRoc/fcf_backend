// Libraries
import styled from '@emotion/styled';
import { animated } from 'react-spring';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
// Custom Props
import systemProps from 'theme/system-props.js';

// @jsx jsx
import { css, jsx } from '@emotion/core';

// TODO only keep items I'm usings
export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

const Box = styled('div', { shouldForwardProp })(
  { className: 'Box' },
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
  ({ styledFlex = '' }) => {
    const [alignItems, justifyContent = 'flex-start', flexDirection = 'row'] = styledFlex.split(
      ' ',
    );
    return (
      styledFlex && {
        alignItems,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection,
        height: '100%',
        justifyContent,
        width: '100%',
      }
    );
  },
  systemProps,
);

const AnimatedBox = animated(Box);

export { AnimatedBox, Box };
