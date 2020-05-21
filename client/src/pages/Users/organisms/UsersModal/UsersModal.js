// Libraries
import React, { useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Text } from 'atoms';
// Organisms
import LabeledInput from 'organisms/LabeledInput';
// UsersModal Organisms
import UserRolesRadioGroup from './UserRolesRadioGroup';
// User Constants
import { USER_ROLES } from '../../constants/enums';

// Roles Options

const rolesOptions = [
  {
    label: 'User',
    value: USER_ROLES.USER,
  },
  {
    label: 'Admin',
    value: USER_ROLES.ADMIN,
  },
  {
    label: 'Super Admin',
    value: USER_ROLES.SUPER_ADMIN,
  },
];

// UsersModal

const UsersModal = ({ onCancel, onSave, user }) => {
  // State

  const [email, setEmail] = useState(user?.email || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(user?.password || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [role, setRole] = useState(user?.role);

  // Functions

  const handleClearIconClick = e => {
    // setName('');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    // inputRef.current?.focus();
  };

  const handleOnClick = async () => {
    setIsLoading(true);
    await onSave({ _id: user && user._id, email, firstName, lastName, password, role });
    setIsLoading(false);
  };

  // Return

  return (
    <Box padding='15px 30px' styledFlex='center space-between column'>
      <Box paddingTop='20px' styledFlex='flex-start space-between column'>
        <LabeledInput label='First Name' width='50%'>
          <Input
            onChange={e => setFirstName(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. John'
            value={firstName}
          />
        </LabeledInput>

        <LabeledInput label='Last Name' width='50%'>
          <Input
            onChange={e => setLastName(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. Smith'
            value={lastName}
          />
        </LabeledInput>

        <LabeledInput label='Email' width='50%'>
          <Input
            onChange={e => setEmail(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. john.smith@gmail.com'
            value={email}
          />
        </LabeledInput>

        <LabeledInput label='Password' width='50%'>
          <Input
            onChange={e => setPassword(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. yooo'
            value={password}
          />
        </LabeledInput>
      </Box>

      <UserRolesRadioGroup initialRole={role} onSelect={setRole} options={rolesOptions} />

      <Box height='auto' styledFlex='flex-end'>
        <Button
          backgroundColor='lightgrey'
          border='none'
          borderRadius='4px 0 0 4px'
          height='30px'
          onClick={onCancel}
          width='50%'
        >
          Cancel
        </Button>
        <Button
          backgroundColor='lightseagreen'
          border='none'
          borderRadius='0 4px 4px 0'
          height='30px'
          onClick={handleOnClick}
          width='50%'
        >
          Save
        </Button>
      </Box>
      {isLoading && <Text>Loading...</Text>}
    </Box>
  );
};

UsersModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  wod: PropTypes.object,
  // wod: PropTypes.shape({
  //   date: PropTypes.object,
  //   description: PropTypes.string,
  //   name: PropTypes.string,
  // }),
};

UsersModal.defaultProps = {
  onCancel: null,
  onSave: null,
  wod: null,
};

export default UsersModal;
