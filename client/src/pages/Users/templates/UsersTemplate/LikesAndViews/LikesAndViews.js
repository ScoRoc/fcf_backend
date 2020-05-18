// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import { LikesAndViewsCard } from '../../../organisms';
import { LikesAndViewsTabBar } from '../../../organisms';

const items = {
  announcements: [
    { icons: ['[heart]', '[eye]'], values: ['Today at the gym...'] },
    { icons: ['[heart]', '[eye]'], values: ['At the gym today...'] },
    { icons: ['[heart]', '[eye]'], values: ['Our new shirts are in!'] },
    { icons: ['[heart]', '[eye]'], values: ['Stop by for a plant-burger!'] },
    { icons: ['[heart]', '[eye]'], values: ['Today at the gym...'] },
    { icons: ['[heart]', '[eye]'], values: ['At the gym today...'] },
    { icons: ['[heart]', '[eye]'], values: ['Our new shirts are in!'] },
    { icons: ['[heart]', '[eye]'], values: ['Stop by for a plant-burger!'] },
  ],
  events: [
    { icons: ['[heart]', '[eye]'], values: ['Mock Comp', '5/16/2020'] },
    { icons: ['[heart]', '[eye]'], values: ['Champagne Friday', '5/14/2020'] },
    { icons: ['[heart]', '[eye]'], values: ['Wine Down Wednesday', '5/12/2020'] },
    { icons: ['[heart]', '[eye]'], values: ['Community Class', '5/10/2020'] },
    { icons: ['[heart]', '[eye]'], values: ['Mock Comp', '5/16/2020'] },
    { icons: ['[heart]', '[eye]'], values: ['Champagne Friday', '5/14/2020'] },
    { icons: ['[heart]', '[eye]'], values: ['Wine Down Wednesday', '5/12/2020'] },
    { icons: ['[heart]', '[eye]'], values: ['Community Class', '5/10/2020'] },
  ],
  wods: [
    { icons: ['[heart]'], values: ['Cindy', '5/16/2020'] },
    { icons: ['[heart]'], values: ['Karen', '5/14/2020'] },
    { icons: ['[heart]'], values: ['DT', '5/12/2020'] },
    { icons: ['[heart]'], values: ['Murph', '5/10/2020'] },
    { icons: ['[heart]'], values: ['Cindy', '5/16/2020'] },
    { icons: ['[heart]'], values: ['Karen', '5/14/2020'] },
    { icons: ['[heart]'], values: ['DT', '5/12/2020'] },
    { icons: ['[heart]'], values: ['Murph', '5/10/2020'] },
  ],
};

// LikesAndViews

const LikesAndViews = ({ children, ...props }) => {
  // State

  const [currentTab, setCurrentTab] = useState('wods');

  // Functions

  const handleTabClick = tab => {
    setCurrentTab(tab);
  };

  // Return

  return (
    <Box
      boxSizing='content-box'
      className='LikesAndViews'
      margin='-5px'
      overflow='hidden'
      padding='5px'
      styledFlex='center flex-start column'
      {...props}
    >
      <Text marginBottom='10px'>Likes and Views</Text>
      <LikesAndViewsTabBar currentTab={currentTab} onTabClick={handleTabClick} />
      <LikesAndViewsCard items={items[currentTab]} />
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
