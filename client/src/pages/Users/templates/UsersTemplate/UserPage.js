// Libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// UserPage Organisms
import { UserPageCard } from '../../organisms';
// UserPage Templates
import LikesAndViews from './LikesAndViews/LikesAndViews';

// Moments

const sunday = moment().day('Sunday');

const currentMonth = moment().month(sunday.month()).format('MMMM');
const currentYear = moment().year();

// UserPage

const UserPage = ({ children }) => {
  // Location

  const location = useLocation();

  // State

  const [likes, setLikes] = useState({
    data: [
      { name: 'Current Week', value: 54 },
      { name: 'Last Week', value: 31 },
      { name: `${currentMonth} ${currentYear}`, value: 28 },
    ],
    title: `Likes in ${currentMonth}`,
  });
  const [logins, setLogins] = useState({
    data: [
      { name: 'WODs', value: 54 },
      { name: 'Announcements', value: 31 },
      { name: 'Events', value: 28 },
    ],
    title: 'Logins',
  });
  const [user, setUser] = useState(location?.state?.user || null);
  const [views, setViews] = useState({
    data: [
      { name: 'Announcements', value: 31 },
      { name: 'Events', value: 28 },
    ],
    title: `Views in ${currentMonth}`,
  });

  // Effects

  useEffect(() => {
    if (!user) {
      // NEED TO PULL FROM DB TO HANDLE REFRESH
      setUser({
        _id: 9999,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      });
    }
  }, []);

  // Return

  return !user ? (
    <Text>Loading...</Text>
  ) : (
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
      //   gridTemplateArea='header header
      // logins likes-views
      // likes likes-views
      // views likes-views'
      gridTemplateColumns='2fr 1fr'
      gridTemplateRows='auto'
      height='100%'
      padding='20px'
    >
      <Box gridArea='header'>
        <Text>
          Hello {user.firstName} {user.lastName}
        </Text>
        <Text>id: {user._id}</Text>
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
  );
};

UserPage.propTypes = {
  children: PropTypes.element,
};

UserPage.defaultProps = {
  children: null,
};

export default UserPage;
