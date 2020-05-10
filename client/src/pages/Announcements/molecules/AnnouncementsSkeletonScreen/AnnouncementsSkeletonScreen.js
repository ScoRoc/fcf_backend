// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// AnnouncementsSkeletonCard

const AnnouncementsSkeletonCard = props => {
  // Return

  return (
    <Box
      background='yellow'
      className='AnnouncementSkeletonCard'
      height='200px'
      marginBottom='20px'
      width='100%'
      {...props}
    />
  );
};

AnnouncementsSkeletonCard.propTypes = {
  //
};

AnnouncementsSkeletonCard.defaultProps = {
  //
};

export default AnnouncementsSkeletonCard;
