// Library
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Atoms
import { Input } from 'atoms';
// Molecules
import LabeledInput from 'organisms/LabeledInput';

// LoginInput

const LoginInput = ({ label, onChange, type, value, ...props }) => {
  // Theme

  const theme = useTheme();

  // Return

  return (
    <LabeledInput className='LabeledInput' label={label}>
      <Input
        clearButtonStyles={{ top: '12px' }}
        css={css`
          color: ${theme.colors.black};
          fontsize: ${theme.sizes.sm};
        `}
        marginTop='10px'
        onChange={onChange}
        type={type}
        value={value}
        width='100%'
      />
    </LabeledInput>
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
