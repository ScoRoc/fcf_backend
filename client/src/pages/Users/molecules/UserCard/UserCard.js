// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
// Utils
import { FULL_PATHS } from 'utils/constants';

// UserCard

const UserCard = ({ user, ...props }) => {
  const to = {
    pathname: `${FULL_PATHS.USERS}/${user._id}`,
    state: { user },
  };
  return (
    <Box
      backgroundColor='honeydew'
      boxShadow='0 2px 4px -2px rgba(0, 0, 0, 0.2)'
      className='UserCard'
      height='50px'
      marginBottom='20px'
      styledFlex='stretch space-evenly'
      {...props}
    >
      <CardColumn>
        <Text>[userType]</Text>
      </CardColumn>
      <CardColumn>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{user.email}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{user.totalLikes}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{user.totalViews}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{user.lastLogin}</Text>
      </CardColumn>
      <Separator />
      <CardColumn flexDirection='row'>
        <Link css={{ textDecoration: 'none' }} to={to}>
          [rightArrow]
        </Link>
      </CardColumn>
    </Box>
  );
};

UserCard.propTypes = {
  users: PropTypes.number,
};

UserCard.defaultProps = {
  users: null,
};

export default UserCard;
