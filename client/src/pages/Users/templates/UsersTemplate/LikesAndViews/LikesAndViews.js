// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import { LikesAndViewsCard } from '../../../organisms';
import { LikesAndViewsTabBar } from '../../../organisms';

const items = [
  {
    date: '5/16/2020',
    name: 'Cindy',
  },
  {
    date: '5/14/2020',
    name: 'Karen',
  },
  {
    date: '5/12/2020',
    name: 'DT',
  },
  {
    date: '5/10/2020',
    name: 'Murph',
  },
];

// LikesAndViews

const LikesAndViews = ({ children, ...props }) => {
  console.log('yo');
  return (
    <Box className='LikesAndViews' {...props}>
      <Box styledFlex='center flex-start column'>
        <Text marginBottom='10px'>Likes and Views</Text>
        <LikesAndViewsTabBar />
        <LikesAndViewsCard items={items} />
      </Box>
    </Box>
  );
};

LikesAndViews.propTypes = {
  children: PropTypes.element,
};

LikesAndViews.defaultProps = {
  children: null,
};

export default LikesAndViews;
