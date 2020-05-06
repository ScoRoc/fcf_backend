// Libraries
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// StyledInput
import StyledInput from './StyledInput';
// Atoms
import { Box } from './Box';

// Input

const Input = forwardRef(
  ({ onChange, onCloseIconClick, showCloseIcon, value, variant, ...props }, ref) => {
    // Theme and Styles
    const theme = useTheme();

    const styles = {
      error: {
        border: `2px solid ${theme.colors.red}`,
        color: `${theme.colors.black}`,
      },
      primary: {
        border: `2px solid ${theme.colors.black}`,
        color: `${theme.colors.black}`,
      },
      success: {
        border: `2px solid ${theme.colors.green}`,
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
            left: 2;
            position: absolute;
            top: 2;

            &:focus {
              background-color: ${theme.colors.offWhite};
            }

            &::selection {
              background-color: ${theme.colors.greyMedium};
              color: ${theme.colors.yellow};
            }
          `}
          onChange={onChange}
          ref={ref}
          value={value}
          variant={variant}
          {...props}
        />

        {showCloseIcon && (
          <Box
            css={css`
              background-color: green;
              height: 48px;
              margin: 0;
              position: absolute;
              right: 2px;
              top: 2px;
              width: 48px;
            `}
            cursor='pointer'
            onClick={onCloseIconClick}
          />
        )}
      </Box>
    );
  },
);

Input.propTypes = {
  onChange: PropTypes.func,
  onCloseIconClick: PropTypes.func,
  showCloseIcon: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'primary', 'success']),
};

Input.defaultProps = {
  onChange: null,
  onCloseIconClick: null,
  showCloseIcon: true,
  value: null,
  variant: 'primary',
};

export default Input;
