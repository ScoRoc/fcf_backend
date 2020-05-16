// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
// import AnimatedLongCard from 'organisms/AnimatedLongCard';

// UserCard

const UserCard = ({ user, onToUsersPageArrowClick, ...props }) => {
  return (
    <Box css={{ filter: 'blur(4px)' }} zIndex={10}>
      <Box
        backgroundColor='honeydew'
        boxShadow='0 2px 4px -2px rgba(0, 0, 0, 0.2)'
        className='UserCard'
        css={{ filter: 'blur(4px)' }}
        height='50px'
        marginBottom='20px'
        styledFlex='stretch space-evenly'
        {...props}
      >
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
          <Text cursor='pointer' onClick={onToUsersPageArrowClick}>
            [rightArrow]
          </Text>
        </CardColumn>
      </Box>
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
