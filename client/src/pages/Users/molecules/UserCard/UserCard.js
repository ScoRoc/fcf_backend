// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useRouteMatch, Link } from 'react-router-dom';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
// Utils
import { PATHS } from 'utils/constants';

// UserCard

const UserCard = ({ user, ...props }) => {
  // History, Location, and Match

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch(PATHS.USERS);
  const match = useRouteMatch();
  console.log('match: ', match);

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
        <Link
          css={{ textDecoration: 'none' }}
          to={location => {
            console.log('location: ', location);
            return `${location.pathname}/${user._ud}`;
          }}
        >
          [rightArrow]
        </Link>
      </CardColumn>
    </Box>
  );
};

UserCard.propTypes = {
  onToUsersPageArrowClick: PropTypes.number,
  users: PropTypes.number,
};

UserCard.defaultProps = {
  onToUsersPageArrowClick: null,
  users: null,
};

export default UserCard;
