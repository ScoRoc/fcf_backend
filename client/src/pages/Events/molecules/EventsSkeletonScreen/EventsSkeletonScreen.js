// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// EventsSkeletonCard

const EventsSkeletonCard = props => {
  // Return

  return (
    <Box
      background='yellow'
      className='EventSkeletonCard'
      height='200px'
      marginBottom='20px'
      width='100%'
      {...props}
    />
  );
};

EventsSkeletonCard.propTypes = {
  //
};

EventsSkeletonCard.defaultProps = {
  //
};

export default EventsSkeletonCard;