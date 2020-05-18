// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// LikesAndViewsTabBar

const LikesAndViewsTabBar = ({ config, currentTab, onTabClick, tabs, tabStyle, ...props }) => {
  const handleClick = ({ tab, e }) => {
    console.log('e: ', e);
    console.log('tab: ', tab);
    onTabClick(tab);
  };

  // Tabs
  const _tabs = tabs.map(tab => {
    const isActive = currentTab === tab.key;

    const backgroundColor = isActive
      ? config.active.backgroundColor
      : config.inactive.backgroundColor;
    const boxShadow = isActive ? config.active.boxShadow : config.inactive.boxShadow;

    return (
      <Box
        backgroundColor={backgroundColor}
        borderRadius='4px 4px 0 0'
        boxShadow={boxShadow}
        css={tabStyle}
        cursor='pointer'
        key={tab.key}
        onClick={e => handleClick({ e, tab: tab.key })}
        padding='0 5px 5px 5px'
        styledFlex='flex-end center'
        zIndex={isActive ? 10 : 0}
      >
        <Text>{tab.title}</Text>
      </Box>
    );
  });

  // Return

  return (
    <Box
      backgroundColor='transparent'
      borderRadius='4px 4px 0 0'
      className='LikesAndViewsTabBar'
      height='40px'
      styledFlex='flex-bottom flex-start'
      {...props}
    >
      {_tabs}
    </Box>
  );
};

LikesAndViewsTabBar.propTypes = {
  config: PropTypes.shape({
    active: PropTypes.shape({
      backgroundColor: PropTypes.string,
      boxShadow: PropTypes.string,
    }),
    active: PropTypes.shape({
      backgroundColor: PropTypes.string,
      boxShadow: PropTypes.string,
    }),
  }),
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  tabStyle: PropTypes.object,
};

LikesAndViewsTabBar.defaultProps = {
  config: {
    active: {
      backgroundColor: 'cornsilk',
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
    },
    inactive: {
      backgroundColor: 'mistyrose',
      boxShadow: '0 0 3px rgba(0, 0, 0, 0.2), 0 -2px 3px -2px rgba(0, 0, 0, 0.2) inset',
    },
  },
  currentTab: null,
  onTabClick: null,
  tabs: null,
  tabStyle: null,
};

export default LikesAndViewsTabBar;
