// Libraries
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Portal from '@reach/portal';
import { useTransition } from 'react-spring';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { AnimatedBox, Box, Text } from 'atoms';
// CardPageLayout Molecules
import { CardPageTitleBar } from '../../molecules';

// CardPageLayout

const CardPageLayout = ({ children, title, ...props }) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs

  const modalRef = useRef(null);

  // Functions

  const handleClick = e => {
    if (!modalRef?.current?.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  // Animation

  const transitions = useTransition(isModalOpen, null, {
    config: {
      clamp: true,
      friction: 24,
      mass: 0.8,
      tension: 270,
      velocity: 0,
    },
    enter: [
      {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: '0px',
        opacity: 1,
        scale: 1,
        width: '300px',
      },
      { height: '300px' },
    ],
    from: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      height: '0px',
      interpolate: 0,
      opacity: 1,
      scale: 1,
      width: '300px',
    },
    leave: [
      { width: '0px' },
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 0,
        scale: 0,
      },
    ],
  });

  const modal = transitions.map(
    ({ item, key, props: { height, opacity, scale, width, ...props } }) =>
      item && (
        <Portal>
          <AnimatedBox
            key={key}
            left='0'
            onClick={handleClick}
            paddingLeft='250px'
            position='absolute'
            style={props}
            styledFlex='center center'
            top='0'
            zIndex='9999'
          >
            <AnimatedBox
              backgroundColor='white'
              overflow='hidden'
              position='relative'
              ref={modalRef}
              style={{
                height,
                opacity,
                transform: scale.interpolate(scale => `scale(${scale})`),
                width,
              }}
              styledFlex='center center'
              width='300px'
            >
              <Text>hi in portal</Text>
            </AnimatedBox>
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
      <CardPageTitleBar onClick={() => setIsModalOpen(true)} title={title} />
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
