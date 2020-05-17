// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
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
// Utils
import { PATHS } from 'utils/constants';

// UsersTemplate

const UsersTemplate = ({ users, ...props }) => {
  // State

  // const [currentUser, setCurrentUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Match

  const match = useRouteMatch(`${PATHS.APP}${PATHS.WODS}`);
  // console.log('match: ', match);

  // Functions

  const handleCloseModal = () => {
    // setCurrentUser(null);
    setIsModalOpen(false);
  };

  // User Cards

  const userCards = Object.values(users.data).map((user, i) => {
    return (
      <UserCard
        key={`${user._id}foo`}
        onToUsersPageArrowClick={() => console.log(`clicked on user id: ${user._id}`)}
        user={user}
      />
    );
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

      <Modal height='650px' width='650px'>
        <UsersModal
          onCancel={handleCloseModal}
          // onSave={handleSaveuser}
          // user={currentuser}
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
