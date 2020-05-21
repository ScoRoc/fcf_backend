// Libraries
import React, { useEffect, useGlobal, useState } from 'reactn';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory, useRouteMatch } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Button, Text } from 'atoms';
// Organisms
import Modal, { ModalProvider } from 'organisms/Modal';
// UserPage Organisms
import { UserPageCard, UsersModal } from '../../organisms';
// UserPage Templates
import LikesAndViews from './LikesAndViews/LikesAndViews';
// Utils
import { FULL_PATHS } from 'utils/constants';

// Moments

const sunday = moment().day('Sunday');

const currentMonth = moment().month(sunday.month()).format('MMMM');
const currentYear = moment().year();

// UserPage

const UserPage = ({ onDeleteClick, onSave, ...props }) => {
  // Global

  const [users] = useGlobal('users');
  // History and Match

  const history = useHistory();
  const match = useRouteMatch();

  // State

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState({
    data: [
      { name: 'WODs', value: 54 },
      { name: 'Announcements', value: 31 },
      { name: 'Events', value: 28 },
    ],
    title: `Likes in ${currentMonth}`,
  });
  const [logins, setLogins] = useState({
    data: [
      { name: 'Current Week', value: 54 },
      { name: 'Last Week', value: 31 },
      { name: `${currentMonth} ${currentYear}`, value: 28 },
    ],
    title: 'Logins',
  });
  const [user, setUser] = useState(users.data[match.params.id]);
  const [views, setViews] = useState({
    data: [
      { name: 'Announcements', value: 31 },
      { name: 'Events', value: 28 },
    ],
    title: `Views in ${currentMonth}`,
  });

  // Functions

  const handleDeleteClick = async () => {
    setIsLoading(true);
    const response = await onDeleteClick({ _id: user._id });
    setIsLoading(false);
    // is this the right history function to use?
    console.log('response: ', response);
    response && history.replace(FULL_PATHS.USERS);
  };

  const handleSave = async ({ _id, email, firstName, lastName, password, role }) => {
    const res = await onSave({ _id, email, firstName, lastName, password, role });
    if (res) {
      setUser(res.data.user);
      setIsModalOpen(false);
    }
  };

  // Return

  return !user ? (
    <Text>Loading...</Text>
  ) : (
    <ModalProvider
      isOpen={isModalOpen}
      onClose={() => console.log('closing...')}
      onOpen={() => console.log('opening...')}
      onOverlayClick={() => setIsModalOpen(false)}
      setIsOpen={() => setIsModalOpen(false)}
    >
      <Box
        className='UserPage'
        css={css`
          grid-template-areas:
            'header header'
            'logins likes-views'
            'likes likes-views'
            'views likes-views';
        `}
        display='grid'
        flex={1}
        gridGap='20px'
        gridTemplateColumns='2fr 1.2fr'
        gridTemplateRows='auto'
        height='100%'
        padding='20px'
        {...props}
      >
        <Box gridArea='header' height='80px' styledFlex='center center column'>
          <Text>
            Hello {user.firstName} {user.lastName}, permission: {user.role}
          </Text>
          <Text>id: {user._id}</Text>
          <Text>{user.email}</Text>
          <Button onClick={() => setIsModalOpen(true)}>Edit Info</Button>
          <Button onClick={handleDeleteClick}>Delete User</Button>
          {isLoading && <Text>Loading...</Text>}
        </Box>

        <UserPageCard
          className='logins-card'
          girdArea='logins'
          items={logins.data}
          title={logins.title}
        />
        <UserPageCard
          className='likes-card'
          girdArea='likes'
          items={likes.data}
          title={likes.title}
        />
        <UserPageCard
          className='views-card'
          girdArea='views'
          items={views.data}
          title={views.title}
        />
        <LikesAndViews gridArea='likes-views' />
      </Box>
      <Modal height='650px' width='100vw'>
        <UsersModal onCancel={() => setIsModalOpen(false)} onSave={handleSave} user={user} />
      </Modal>
    </ModalProvider>
  );
};

UserPage.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

UserPage.defaultProps = {
  onDeleteClick: null,
  onSave: null,
};

export default UserPage;
