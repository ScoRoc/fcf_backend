// Libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// UserPage

const UserPage = ({ children }) => {
  // Location

  const location = useLocation();

  // State

  const [user, setUser] = useState(location?.state?.user || null);

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

      <Box gridArea='logins' styledFlex='stretch space-between column'>
        <Text marginBottom='10px'>Logins</Text>
        <Box backgroundColor='slateblue' flex={1} width='100%'>
          54
        </Box>
      </Box>
      <Box gridArea='likes'>
        <Text>Likes in [month]</Text>
      </Box>
      <Box gridArea='views'>
        <Text>Views in [month]</Text>
      </Box>
      <Box gridArea='likes-views'>
        <Text>Likes and Views</Text>
      </Box>
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
