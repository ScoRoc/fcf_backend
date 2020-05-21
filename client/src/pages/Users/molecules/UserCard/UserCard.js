// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
// Utils
import { FULL_PATHS } from 'utils/constants';

const UserSeparator = props => <Separator backgroundColor='orchid' height='40px' margin='5px 0' />;

// UserCard

const UserCard = ({ user, ...props }) => {
  const buildLastLogin = user => {
    if (!user.meta.lastLogin) return 'error getting date';

    const day = moment(user.meta.lastLogin).format('D');
    const month = moment(user.meta.lastLogin).format('MMM');
    const year = moment(user.meta.lastLogin).format('YYYY');
    return `${month} ${day}, ${year}`;
  };

  const lastLogin = buildLastLogin(user);

  const totalLikes =
    user.announcements.liked.length + user.events.liked.length + user.wods.liked.length;
  const totalViews = user.announcements.viewed.length + user.events.viewed.length;

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
      <UserSeparator />
      <CardColumn>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
      </CardColumn>
      <UserSeparator />
      <CardColumn>
        <Text>{user.email}</Text>
      </CardColumn>
      <UserSeparator />
      <CardColumn>
        <Text>{totalLikes}</Text>
      </CardColumn>
      <UserSeparator />
      <CardColumn>
        <Text>{totalViews}</Text>
      </CardColumn>
      <UserSeparator />
      <CardColumn>
        <Text>{lastLogin}</Text>
      </CardColumn>
      <UserSeparator />
      <CardColumn flexDirection='row'>
        <Link css={{ textDecoration: 'none' }} to={`${FULL_PATHS.USERS}/${user._id}`}>
          [rightArrow]
        </Link>
      </CardColumn>
    </Box>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired, // valid user object
};

UserCard.defaultProps = {
  user: null,
};

export default UserCard;
