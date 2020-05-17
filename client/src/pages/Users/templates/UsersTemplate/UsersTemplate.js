// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Route, Switch } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';
// Organisms
import Modal, { ModalProvider } from 'organisms/Modal';
// User Molecules
import { UserCard, UsersHeader } from '../../molecules';
// User Organisms
import { UsersCardHeaderBar, UsersModal } from '../../organisms/';
// Users Templates
import UserPage from './UserPage';
// Utils
import { FULL_PATHS } from 'utils/constants';

// UsersTemplate

const UsersTemplate = ({ users, ...props }) => {
  // State

  // const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Location

  const location = useLocation();

  // Functions

  const handleCloseModal = () => {
    // setCurrentUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = () => {
    console.log('in handleSaveUser');
  };

  // User Cards

  const userCards = Object.values(users.data).map((user, i) => {
    return <UserCard key={`${user._id}foo`} user={user} />;
  });

  // Return

  return (
    <ModalProvider
      isOpen={isModalOpen}
      onClose={() => console.log('closing...')}
      onOpen={() => console.log('opening...')}
      onOverlayClick={handleCloseModal}
      setIsOpen={setIsModalOpen}
    >
      <Switch>
        <Route path={FULL_PATHS.USER}>
          <UserPage />
        </Route>

        <Route path={FULL_PATHS.USERS}>
          <Box
            className='UsersTemplate'
            flex={1}
            overflow='scroll'
            styledFlex='center flex-start column'
          >
            <Box position='sticky' styledFlex='center flex-start column' top='0px'>
              <UsersHeader onAddNewClick={() => setIsModalOpen(true)} />
              <UsersCardHeaderBar />
            </Box>
            <Box flex={1} padding='10px' width='100%'>
              {userCards}
            </Box>
          </Box>
        </Route>
      </Switch>

      <Modal height='650px' width='650px'>
        <UsersModal
          onCancel={handleCloseModal}
          onSave={handleSaveUser}
          // user={currentUser}
        />
      </Modal>
    </ModalProvider>
  );
};

UsersTemplate.propTypes = {
  //
};

UsersTemplate.defaultProps = {
  //
};

export default UsersTemplate;
