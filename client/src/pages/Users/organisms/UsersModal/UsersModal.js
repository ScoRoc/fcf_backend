// Libraries
import React, { useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Text } from 'atoms';
// Organisms
import LabeledInput from 'organisms/LabeledInput';

// UsersModal

const UsersModal = ({ onCancel, onSave, user }) => {
  // State

  const [email, setEmail] = useState(user?.email || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [password, setPassword] = useState(user?.password || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  // Functions

  const handleClearIconClick = e => {
    // setName('');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    // inputRef.current?.focus();
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

      <Box height='auto' margin='40px 0' width='100%'>
        <Text marginBottom='10px'>Permissions</Text>

        <Box height='auto' styledFlex='stretch space-between'>
          <Button fontSize='1.3rem' height='40px' width='31%'>
            User
          </Button>
          <Button fontSize='1.3rem' height='40px' width='31%'>
            Admin
          </Button>
          <Button fontSize='1.3rem' height='40px' width='31%'>
            Super-Admin
          </Button>
        </Box>
      </Box>

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
          onClick={() => onSave({ _id: user && user._id, firstName, email, password, lastName })}
          width='50%'
        >
          Save
        </Button>
      </Box>
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
