// Libraries
import React, { forwardRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// StyledInput
import StyledInput from './StyledInput';
// Atoms
import { Box } from './Box';
// Hooks
import { mergeRefs } from 'hooks';

// Input

const Input = forwardRef(
  (
    { clearButtonStyles, onChange, onClearIconClick, showCloseIcon, value, variant, ...props },
    ref,
  ) => {
    // State

    const [inputHeight, setInputHeight] = useState(0);

    // Callback Refs

    const inputRef = useCallback(node => {
      if (node !== null) {
        setInputHeight(node.getBoundingClientRect().height);
      }
    }, []);

    // Theme and Styles
    const theme = useTheme();

    const borderWidth = 2;

    const styles = {
      error: {
        border: `${borderWidth}px solid ${theme.colors.red}`,
        color: `${theme.colors.black}`,
      },
      primary: {
        border: `${borderWidth}px solid ${theme.colors.black}`,
        color: `${theme.colors.black}`,
      },
      success: {
        border: `${borderWidth}px solid ${theme.colors.green}`,
        color: `${theme.colors.black}`,
      },
    };

    // Return

    return (
      <Box className='InputBox' position='relative' width='100%'>
        <StyledInput
          className='Input'
          css={css`
            ${styles[variant]}

            &:focus {
              background-color: ${theme.colors.offWhite};
            }

            &::selection {
              background-color: ${theme.colors.greyMedium};
              color: ${theme.colors.yellow};
            }
          `}
          onChange={onChange}
          ref={mergeRefs(ref, inputRef)}
          value={value}
          variant={variant}
          {...props}
        />

        {showCloseIcon && (
          <Box
            backgroundColor='green'
            css={clearButtonStyles}
            height={inputHeight - 2 * borderWidth}
            margin='0'
            position='absolute'
            right={`${borderWidth}px`}
            top={`${borderWidth}px`}
            width={inputHeight - 2 * borderWidth}
            cursor='pointer'
            onClick={onClearIconClick}
          />
        )}
      </Box>
    );
  },
);

Input.propTypes = {
  clearButtonStyles: PropTypes.style,
  onChange: PropTypes.func.isRequired,
  onClearIconClick: PropTypes.func,
  showCloseIcon: PropTypes.bool,
  value: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'primary', 'success']),
};

Input.defaultProps = {
  clearButtonStyles: {},
  onChange: null,
  onClearIconClick: null,
  showCloseIcon: true,
  value: null,
  variant: 'primary',
};

export default Input;
