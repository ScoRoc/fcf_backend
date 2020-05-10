// Library
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Atoms
import { Label, Text, Input } from 'atoms';

// LoginInput

const LoginInput = ({ label, onChange, type, value, ...props }) => {
  // Theme

  const theme = useTheme();

  // Return

  return (
    <Label
      className='LoginInput'
      css={css`
        color: ${theme.colors.greyLight};
        fontsize: ${theme.sizes.sm};
      `}
      marginBottom='40px'
      width='100%'
      {...props}
    >
      <Text color='greyLight'>{label}</Text>
      <Input
        clearButtonStyles={{ top: '12px' }}
        marginTop='10px'
        onChange={onChange}
        type={type}
        value={value}
        width='100%'
      />
    </Label>
  );
};

LoginInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['password', 'text']),
  value: PropTypes.string.isRequired,
};

LoginInput.defaultProps = {
  label: null,
  onChange: null,
  type: 'text',
  value: null,
};

export default LoginInput;
