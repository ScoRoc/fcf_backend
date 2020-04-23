// Libraries
import React from 'react';
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Custom Props
import systemProps from 'widgets/systemProps.js';

// TODO only keep items I'm usings
export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

const StyledText = styled('p', { shouldForwardProp })(systemProps);

const Text = props => {
  const theme = useTheme();

  return (
    <StyledText
      css={css`
        ${theme.text.base}
      `}
      {...props}
    />
  );
};

export default Text;
