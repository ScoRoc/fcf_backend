// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// WodsSkeletonCard

const WodsSkeletonCard = props => {
  // Return

  return (
    <Box
      background='yellow'
      className='WodSkeletonCard'
      height='200px'
      marginBottom='20px'
      width='100%'
      {...props}
    />
  );
};

WodsSkeletonCard.propTypes = {
  //
};

WodsSkeletonCard.defaultProps = {
  //
};

export default WodsSkeletonCard;
