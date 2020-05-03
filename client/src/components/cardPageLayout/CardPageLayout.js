// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Portal from '@reach/portal';
import { animated, useTransition } from 'react-spring';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { AnimatedBox, Box, Button, Text, TitleBar } from 'widgets';

// CardPageLayout

const CardPageLayout = ({ children, title, ...props }) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation

  const transitions = useTransition(isModalOpen, null, {
    enter: { backgroundColor: 'rgba(0, 0, 0, .4)' },
    from: { backgroundColor: 'rgba(0, 0, 0, 0)' },
    leave: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  });

  const modal = transitions.map(
    ({ item, key, props }) =>
      item && (
        <Portal>
          <AnimatedBox
            backgroundColor='rgba(0, 0, 0, .4)'
            key={key}
            left='0'
            onClick={() => setIsModalOpen(false)}
            paddingLeft='250px'
            position='absolute'
            style={props}
            styledFlex='center center'
            top='0'
            zIndex='9999'
          >
            <Box
              backgroundColor='white'
              height='300px'
              position='relative'
              styledFlex='center center'
              width='300px'
            >
              <Text>hi in portal</Text>
            </Box>
          </AnimatedBox>
        </Portal>
      ),
  );

  // Return

  return (
    <Box
      className='CardPageLayout'
      flex={1}
      overflowY='scroll'
      padding='30px 30px 0 30px'
      styledFlex='center flex-start column'
      {...props}
    >
      <TitleBar>
        <Text>{title}</Text>
        <Button onClick={() => setIsModalOpen(true)}>Add New</Button>
      </TitleBar>
      {children}
      {/* {isModalOpen && (
        <Portal>
          <AnimatedBox
            backgroundColor='rgba(0, 0, 0, .4)'
            position='absolute'
            left='0'
            onClick={() => setIsModalOpen(false)}
            paddingLeft='250px'
            styledFlex='center center'
            top='0'
            zIndex='9999'
          >
            <Box
              backgroundColor='white'
              height='300px'
              position='relative'
              styledFlex='center center'
              width='300px'
            >
              <Text>hi in portal</Text>
            </Box>
          </AnimatedBox>
        </Portal>
      )} */}
      {modal}
    </Box>
  );
};

CardPageLayout.propTypes = {
  title: PropTypes.string,
};

CardPageLayout.defaultProps = {
  title: 'Add a title...',
};

export default CardPageLayout;
