// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// LikesAndViewsCard

const LikesAndViewsCard = ({ items, ...props }) => {
  const rows = items.map((item, i) => {
    const icons = item.icons.map((icon, j) => (
      <Text key={`${j}${item.icons.length}${item.name}`}>{icon}</Text>
    ));
    const text = item.values.map((value, j) => (
      <Text key={`${j}${item.values.length}${item.name}`}>{value}</Text>
    ));

    return (
      <Box
        backgroundColor='cornsilk'
        height='80px'
        key={`${i}${item.name}`}
        padding='0 10px'
        styledFlex='center space-between'
        zIndex={20}
        {...props}
      >
        <Box styledFlex='center space-around column'>{text}</Box>
        <Box styledFlex='center space-evenly'>{icons}</Box>
      </Box>
    );
  });
  return (
    <Box
      backgroundColor='cornsilk'
      boxShadow='0 0 3px rgba(0, 0, 0, 0.2)'
      className='LikesAndViewsCard'
      overflow='scroll'
      styledFlex='stretch flex-start column'
    >
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
