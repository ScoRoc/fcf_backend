// Libraries
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// StyledTextArea
import StyledTextArea from './StyledTextArea';
// Atoms
import { Box } from './Box';
import Button from './Button';

// TextArea
// if showing clearButton then passing height is required
const TextArea = forwardRef(
  (
    { clearButtonPosition, height, onChange, onClearButtonClick, value, variant, ...props },
    ref,
  ) => {
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

    // Style

    const clearButtonStyleMap = {
      bottomLeft: css`
        bottom: 0;
        left: 0;
      `,
      bottomRight: css`
        bottom: 0;
        right: 0;
      `,
      topLeft: css`
        left: 0;
        top: 0;
      `,
      topRight: css`
        right: 0;
        top: 0;
      `,
    };

    // Return

    return (
      <Box className='TextAreaBox' height={height} position='relative' width='100%'>
        <StyledTextArea
          className='TextArea'
          css={css`
            ${styles[variant]}
            resize: none;

            &:focus {
              background-color: ${theme.colors.offWhite};
            }

            &::selection {
              background-color: ${theme.colors.greyMedium};
              color: ${theme.colors.yellow};
            }
          `}
          height={height}
          onChange={onChange}
          value={value}
          variant={variant}
          {...props}
        />

        {clearButtonPosition !== 'disabled' && (
          <Button
            className='TextAreaClearButton'
            css={css`
              position: absolute;
              ${clearButtonStyleMap[clearButtonPosition]}
            `}
            cursor='pointer'
            onClick={onClearButtonClick}
            ref={ref?.clearButtonRef}
          >
            Clear
          </Button>
        )}
      </Box>
    );
  },
);

TextArea.propTypes = {
  clearButtonPosition: PropTypes.oneOf([
    'bottomLeft',
    'bottomRight',
    'disabled',
    'topLeft',
    'topRight',
  ]),
  height: PropTypes.string, // valid height string
  onChange: PropTypes.func.isRequired,
  onClearButtonClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'primary', 'success']),
};

TextArea.defaultProps = {
  clearButtonPosition: 'bottomRight',
  height: '200px',
  onChange: null,
  onClearButtonClick: null,
  value: '',
  variant: 'primary',
};

export default TextArea;
