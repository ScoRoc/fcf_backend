// Libraries
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// RadioGroup

export const RadioContext = createContext({});

const RadioGroup = ({ children, initialValue, ...props }) => {
  const [checked, setChecked] = useState(initialValue?.checked);

  const value = {
    checked,
    setChecked,
  };

  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
};

RadioGroup.propTypes = {
  initialValue: PropTypes.shape({
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  }).isRequired,
};

RadioGroup.defaultProps = {
  initialValue: null,
};

export default RadioGroup;
