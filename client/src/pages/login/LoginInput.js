// Library
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Button, Text, Input } from 'widgets';

// LoginInput

const LoginInput = ({ label, onChange, type, value, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  // Return

  return (
    <label className='LoginInput' css={styles.label} {...props}>
      <Text color='greyLight'>{label}</Text>
      <Input css={styles.input} onChange={onChange} size='sm' type={type} value={value} />
    </label>
  );
};

const buildStyle = theme => ({
  input: {
    marginTop: '10px',
    width: '100%',
  },
  label: {
    color: theme.colors.greyLight,
    fontSize: theme.sizes.sm,
    marginBottom: '40px',
    width: '100%',
  },
});

LoginInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['password', 'text']),
  value: PropTypes.string,
};

LoginInput.defaultProps = {
  label: 'Add a label',
  onChange: null,
  type: 'text',
  value: '',
};

export default LoginInput;
