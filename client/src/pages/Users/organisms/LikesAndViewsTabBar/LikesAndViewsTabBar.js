// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// LikesAndViewsTabBar

const LikesAndViewsTabBar = ({ ...props }) => {
  // State

  const [announcementsStatus, setAnnouncementsStatus] = useState({
    backgroundColor: 'cornsilk',
    zIndex: 10,
  });
  const [eventsStatus, setEventsStatus] = useState({
    backgroundColor: 'mistyrose',
    zIndex: 0,
  });
  const [wodsStatus, setWodsStatus] = useState({
    backgroundColor: 'mistyrose',
    zIndex: 0,
  });
  const handleClick = ({ tab, e }) => {
    console.log('e: ', e);
    console.log('tab: ', tab);
    setAnnouncementsStatus({
      backgroundColor: `${tab === 'announcements' ? 'cornsilk' : 'mistyrose'}`,
      zIndex: `${tab === 'announcements' ? 10 : 1}`,
    });
    setEventsStatus({
      backgroundColor: `${tab === 'events' ? 'cornsilk' : 'mistyrose'}`,
      zIndex: `${tab === 'events' ? 10 : 0}`,
    });
    setWodsStatus({
      backgroundColor: `${tab === 'wods' ? 'cornsilk' : 'mistyrose'}`,
      zIndex: `${tab === 'wods' ? 10 : 0}`,
    });
  };
  return (
    <Box
      className='LikesAndViewsTabBar'
      height='40px'
      overflow='hidden'
      styledFlex='flex-bottom flex-start'
      {...props}
    >
      <Box
        backgroundColor={wodsStatus.backgroundColor}
        borderRadius='4px'
        boxShadow='5px 0 3px -2px rgba(0, 0, 0, 0.1)'
        cursor='pointer'
        onClick={e => handleClick({ e, tab: 'wods' })}
        styledFlex='center center'
        zIndex={wodsStatus.zIndex}
      >
        <Text>WODs</Text>
      </Box>
      <Box
        backgroundColor={announcementsStatus.backgroundColor}
        borderRadius='4px'
        boxShadow='0 0 4px rgba(0, 0, 0, 0.2)'
        cursor='pointer'
        onClick={e => handleClick({ e, tab: 'announcements' })}
        styledFlex='center center'
        zIndex={announcementsStatus.zIndex}
      >
        <Text>Announcements</Text>
      </Box>
      <Box
        backgroundColor={eventsStatus.backgroundColor}
        borderRadius='4px'
        boxShadow='-5px 0 3px -2px rgba(0, 0, 0, 0.1)'
        cursor='pointer'
        onClick={e => handleClick({ e, tab: 'events' })}
        styledFlex='center center'
        zIndex={eventsStatus.zIndex}
      >
        <Text>Events</Text>
      </Box>
    </Box>
  );
};

LikesAndViewsTabBar.propTypes = {
  children: PropTypes.element,
};

LikesAndViewsTabBar.defaultProps = {
  children: null,
};

export default LikesAndViewsTabBar;
