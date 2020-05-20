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

const UsersTemplate = ({ deleteUser, isLoading, patchUser, postUser, users, ...props }) => {
  // State

  const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Location

  const location = useLocation();

  // Functions

  const handleCloseModal = () => {
    setCurrentUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = async ({ _id, email, firstName, lastName, password, role }) => {
    const res = _id
      ? await patchUser({ _id, email, firstName, lastName, password, role })
      : await postUser({ email, firstName, lastName, password, role });

    !!res && setIsModalOpen(false);
    return res;
  };

  const handleUserPageDeleteClick = async ({ _id }) => {
    return await deleteUser({ _id });
  };

  const handleUserPageEditClick = user => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  // User Cards

  const userCards = Object.values(users.data).map(user => {
    return <UserCard key={`${user._id}`} user={user} />;
  });

  // Return

  return (
    <ModalProvider
      isOpen={isModalOpen}
      onClose={() => console.log('closing...')}
      onOpen={() => console.log('opening...')}
      onOverlayClick={handleCloseModal}
      setIsOpen={handleCloseModal}
    >
      <Switch>
        <Route path={FULL_PATHS.USER}>
          <UserPage
            onDeleteClick={handleUserPageDeleteClick}
            onEditClick={handleUserPageEditClick}
          />
        </Route>

        <Route path={FULL_PATHS.USERS}>
          <Box className='UsersTemplate' flex={1} styledFlex='center flex-start column'>
            <Box
              className='UsersTemplateHeader'
              height='75px'
              styledFlex='center flex-start column'
            >
              <UsersHeader onAddNewClick={() => setIsModalOpen(true)} />
              <UsersCardHeaderBar />
            </Box>
            <Box flex={1} height='100%' overflow='scroll' padding='10px' width='100%'>
              {userCards}
            </Box>
          </Box>
        </Route>
      </Switch>

      <Modal height='650px' width='650px'>
        <UsersModal onCancel={handleCloseModal} onSave={handleSaveUser} user={currentUser} />
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
