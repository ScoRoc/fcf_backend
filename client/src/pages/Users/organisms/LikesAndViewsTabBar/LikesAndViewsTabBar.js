// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// LikesAndViewsTabBar

const LikesAndViewsTabBar = ({ onTabClick, ...props }) => {
  // State

  const [announcementsStatus, setAnnouncementsStatus] = useState({
    backgroundColor: 'cornsilk',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
    zIndex: 10,
  });
  const [eventsStatus, setEventsStatus] = useState({
    backgroundColor: 'mistyrose',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
    zIndex: 0,
  });
  const [wodsStatus, setWodsStatus] = useState({
    backgroundColor: 'mistyrose',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
    zIndex: 0,
  });
  const handleClick = ({ tab, e }) => {
    console.log('e: ', e);
    console.log('tab: ', tab);
    onTabClick(tab);
    setAnnouncementsStatus({
      backgroundColor: `${tab === 'announcements' ? 'cornsilk' : 'mistyrose'}`,
      boxShadow: `${
        tab === 'announcements'
          ? '0 0 3px rgba(0, 0, 0, 0.2)'
          : '0 0 3px rgba(0, 0, 0, 0.2), 0 -2px 3px -2px rgba(0, 0, 0, 0.2) inset'
      }`,
      zIndex: `${tab === 'announcements' ? 10 : 1}`,
    });
    setEventsStatus({
      backgroundColor: `${tab === 'events' ? 'cornsilk' : 'mistyrose'}`,
      boxShadow: `${
        tab === 'events'
          ? '0 0 3px rgba(0, 0, 0, 0.2)'
          : '0 0 3px rgba(0, 0, 0, 0.2), 0 -2px 3px -2px rgba(0, 0, 0, 0.2) inset'
      }`,
      zIndex: `${tab === 'events' ? 10 : 0}`,
    });
    setWodsStatus({
      backgroundColor: `${tab === 'wods' ? 'cornsilk' : 'mistyrose'}`,
      boxShadow: `${
        tab === 'wods'
          ? '0 0 3px rgba(0, 0, 0, 0.2)'
          : '0 0 3px rgba(0, 0, 0, 0.2), 0 -2px 3px -2px rgba(0, 0, 0, 0.2) inset'
      }`,
      zIndex: `${tab === 'wods' ? 10 : 0}`,
    });
  };
  return (
    <Box
      backgroundColor='transparent'
      borderRadius='4px 4px 0 0'
      className='LikesAndViewsTabBar'
      height='40px'
      styledFlex='flex-bottom flex-start'
      {...props}
    >
      <Box
        backgroundColor={wodsStatus.backgroundColor}
        borderRadius='4px 4px 0 0'
        boxShadow={wodsStatus.boxShadow}
        cursor='pointer'
        onClick={e => handleClick({ e, tab: 'wods' })}
        styledFlex='center center'
        zIndex={wodsStatus.zIndex}
      >
        <Text>WODs</Text>
      </Box>
      <Box
        backgroundColor={announcementsStatus.backgroundColor}
        borderRadius='4px 4px 0 0'
        boxShadow={announcementsStatus.boxShadow}
        cursor='pointer'
        onClick={e => handleClick({ e, tab: 'announcements' })}
        styledFlex='center center'
        zIndex={announcementsStatus.zIndex}
      >
        <Text>Announcements</Text>
      </Box>
      <Box
        backgroundColor={eventsStatus.backgroundColor}
        borderRadius='4px 4px 0 0'
        boxShadow={eventsStatus.boxShadow}
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
  onTabClick: PropTypes.func,
};

LikesAndViewsTabBar.defaultProps = {
  onTabClick: null,
};

export default LikesAndViewsTabBar;
