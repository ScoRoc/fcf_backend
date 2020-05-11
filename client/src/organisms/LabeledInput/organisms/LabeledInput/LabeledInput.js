// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Label, Text } from 'atoms';

// LabeledInput

const LabeledInput = ({ children, label, labelStyle, ...props }) => {
  const theme = useTheme();

  return (
    <Label className='LabeledInput' width='100%' {...props}>
      <Text color={theme.colors.green} marginBottom='10px' labelStyle={labelStyle}>
        {label}
      </Text>
      {children}
    </Label>
  );
};

LabeledInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
};

LabeledInput.defaultProps = {
  label: null,
  labelStyle: null,
};

export default LabeledInput;
