// Libraries
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import Modal from 'organisms/Modal';
// User Molecules
import { UserCard, UsersHeader } from '../../molecules';
// User Organisms
import { UsersCardHeaderBar } from '../../organisms/';
// Utils
import { PATHS } from 'utils/constants';

// UsersTemplate

const UsersTemplate = ({ users, ...props }) => {
  // Refs

  const usersCardheaderBarRef = useRef(null);

  // Match

  const match = useRouteMatch(`${PATHS.APP}${PATHS.WODS}`);
  // console.log('match: ', match);

  useEffect(() => {
    const foo = e => {
      console.log('e: ', e);
    };

    if (usersCardheaderBarRef && usersCardheaderBarRef.current) {
      usersCardheaderBarRef.current.addEventListener('scroll', foo);
      return usersCardheaderBarRef.current.removeEventListener('scroll', foo);
    }
  }, []);

  // User Cards

  const userCards = Object.values(users.data).map((user, i) => {
    console.log('user: ', user);
    console.log('user._id: ', user._id);
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
    <Box className='UsersTemplate' flex={1} overflow='scroll' styledFlex='center flex-start column'>
      <Box position='sticky' styledFlex='center flex-start column' top='0px'>
        <UsersHeader />
        <UsersCardHeaderBar ref={usersCardheaderBarRef} />
      </Box>
      <Box flex={1} padding='10px' width='100%'>
        {userCards}
      </Box>
    </Box>
  );
};

UsersTemplate.propTypes = {
  //
};

UsersTemplate.defaultProps = {
  //
};

export default UsersTemplate;
