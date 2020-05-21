// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions

  const handlePatchUser = async ({ _id, email, firstName, lastName, password, role }) => {
    console.log('in patach');
    const res = await patchUser({ _id, email, firstName, lastName, password, role });
    return res;
  };

  const handlePostUser = async ({ email, firstName, lastName, password, role }) => {
    const res = await postUser({ email, firstName, lastName, password, role });

    !!res && setIsModalOpen(false);
    return res;
  };

  const handleUserPageDeleteClick = async ({ _id }) => {
    return await deleteUser({ _id });
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
      onOverlayClick={() => setIsModalOpen(false)}
      setIsOpen={() => setIsModalOpen(false)}
    >
      <Switch>
        <Route path={FULL_PATHS.USER}>
          <UserPage onDeleteClick={handleUserPageDeleteClick} onSave={handlePatchUser} />
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
        <UsersModal onCancel={() => setIsModalOpen(false)} onSave={handlePostUser} />
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
