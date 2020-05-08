// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// WodCard

const WodCard = props => {
  // Return

  return (
    <Box
      background='yellow'
      className='WodSkeletonCard'
      height='200px'
      marginBottom='20px'
      width='100%'
      {...props}
    ></Box>
  );
};

WodCard.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

WodCard.defaultProps = {
  date: null,
  description: null,
  name: null,
};

export default WodCard;
