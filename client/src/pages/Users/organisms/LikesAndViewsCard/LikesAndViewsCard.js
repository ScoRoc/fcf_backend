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
      <Text key={`${i}${j}${item.icons.length}`}>{icon}</Text>
    ));
    const text = item.values.map((value, j) => (
      <Text key={`${i}${j}${item.values.length}`}>{value}</Text>
    ));

    return (
      <Box
        backgroundColor='cornsilk'
        height='80px'
        key={`${i}${item.values.length}`}
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
      position='relative'
      styledFlex='stretch flex-start column'
    >
      {rows}
    </Box>
  );
};

LikesAndViewsCard.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icons: PropTypes.oneOfType([PropTypes.node]),
      values: PropTypes.oneOfType([PropTypes.node]),
    }),
  ).isRequired,
};

LikesAndViewsCard.defaultProps = {
  items: null,
};

export default LikesAndViewsCard;
