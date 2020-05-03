// Libraries
import React from 'react';
import styled from '@emotion/styled';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Custom Props
import systemProps from 'theme/systemProps';

// TODO only keep items I'm usings
// export const forwardedProps = [...props, 'cursor', 'd', 'fill', 'stroke', 'transform'];
export const forwardedProps = [...props, 'cursor'];

export const shouldForwardProp = createShouldForwardProp(forwardedProps);

const StyledInput = styled('input', { shouldForwardProp })(systemProps);

const Input = props => {
  const theme = useTheme();

  return (
    <StyledInput
      className='Input'
      css={css`
        ${theme.input.base}
      `}
      {...props}
    />
  );
};

export default Input;
