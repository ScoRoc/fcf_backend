// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import { RadioGroup } from 'organisms/Radio';
// UsersRolesRadioButton
import UsersRolesRadioButton from './UsersRolesRadioButton';

// UserRolesRadioGroup

const UserRolesRadioGroup = ({ initialRole, onSelect, options, ...props }) => {
  const [checked, setChecked] = useState(initialRole);

  const handleClick = value => {
    setChecked(value);
    onSelect(value);
  };

  const buttons = options.map(option => (
    <UsersRolesRadioButton
      key={option.value}
      onClick={() => handleClick(option.value)}
      value={option.value}
    >
      {option.label}
    </UsersRolesRadioButton>
  ));

  return (
    <Box height='auto' margin='40px 0' width='100%' {...props}>
      <Text marginBottom='10px'>Permissions</Text>

      <RadioGroup initialValue={{ checked }}>
        <Box styledFlex='stretch space-between' {...props}>
          {buttons}
        </Box>
      </RadioGroup>
    </Box>
  );
};

UserRolesRadioGroup.propTypes = {
  initialRole: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
  ).isRequired,
};

UserRolesRadioGroup.defaultProps = {
  initialRole: null,
  onSelect: null,
  options: null,
};

export default UserRolesRadioGroup;
