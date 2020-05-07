// Libraries
import React, { forwardRef, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// StyledTextArea
import StyledTextArea from './StyledTextArea';
// Atoms
import { Box } from './Box';
import Button from './Button';
// Hooks
import { mergeRefs, useDimensions } from 'hooks';

// TextArea

const TextArea = forwardRef(
  ({ onChange, onClearButtonClick, showClearButton, value, variant, ...props }, ref) => {
    ///////////////////////////////////////
    //              TODO                 //
    // NEED TO SET TEXTAREA FIXED HEIGHT //
    //    AND HAVE TEXT SCROLL WITHIN    //
    //  THEN AUTO FIX BUTTON TO TEXTAREA //
    ///////////////////////////////////////

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

    const styleMap = {
      bottomLeft: css`
        ${'' /* bottom: ${buttonContaineDimensions.height - }; */}
      `,
      bottomRight: css``,
      topLeft: css``,
      topLeft: css``,
    };

    // Return

    return (
      <Box className='TextAreaBox' position='relative' width='100%'>
        <StyledTextArea
          className='TextArea'
          css={css`
            ${styles[variant]}
            ${'' /* left: 2; */}
            ${'' /* position: absolute; */}
            ${'' /* top: 2; */}

            &:focus {
              background-color: ${theme.colors.offWhite};
            }

            &::selection {
              background-color: ${theme.colors.greyMedium};
              color: ${theme.colors.yellow};
            }
          `}
          onChange={onChange}
          onResize={handleResize}
          ref={localTextAreaRef}
          value={value}
          variant={variant}
          {...props}
        />

        {showClearButton && (
          <Box position='relative' bottom='3px' margin='0' right='0px'>
            <Button
              css={css`
                position: absolute;
              `}
              cursor='pointer'
              onClick={onClearButtonClick}
              ref={ref?.clearButtonRef}
            >
              Clear
            </Button>
          </Box>
        )}
      </Box>
    );
  },
);

TextArea.propTypes = {
  onChange: PropTypes.func,
  onClearButtonClick: PropTypes.func,
  showClearButton: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'primary', 'success']),
};

TextArea.defaultProps = {
  onChange: null,
  onClearButtonClick: null,
  showClearButton: true,
  value: null,
  variant: 'primary',
};

export default TextArea;
