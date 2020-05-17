// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// LikesAndViewsCard

const LikesAndViewsCard = ({ items, ...props }) => {
  console.log('items: ', items);
  const rows = items.map((item, i) => {
    console.log('item: ', item);
    return (
      <Box key={`${i}${item.name}`} styledFlex='center space-between' {...props}>
        <Box styledFlex='center space-around column'>
          <Text>{item.name}</Text>
          <Text>{item.date}</Text>
        </Box>
        <Box styledFlex='center space-evenly'>
          <Text>[heart]</Text>
          <Text>[eye]</Text>
        </Box>
      </Box>
    );
  });
  return (
    <Box className='LikesAndViewsCard' styledFlex='stretch flex-start column'>
      {rows}
    </Box>
  );
};

LikesAndViewsCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

LikesAndViewsCard.defaultProps = {
  data: null,
};

export default LikesAndViewsCard;
