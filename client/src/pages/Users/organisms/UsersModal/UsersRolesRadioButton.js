// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';
// Organisms
import { RadioButton } from 'organisms/Radio';

// UsersRolesRadioButton

const UsersRolesRadioButton = ({ children, value, ...props }) => {
  return (
    <RadioButton value={value} {...props}>
      {children}
    </RadioButton>
  );
};

UsersRolesRadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
};

UsersRolesRadioButton.defaultProps = {
  value: null,
};

export default UsersRolesRadioButton;
