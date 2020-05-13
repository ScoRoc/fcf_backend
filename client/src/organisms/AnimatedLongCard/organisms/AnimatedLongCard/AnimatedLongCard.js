// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { config, useSpring } from 'react-spring';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import { AnimatedCard } from 'organisms/Card';

// AnimatedLongCard

const AnimatedLongCard = ({ children, ...props }) => {
  // State

  const [isHovered, setIsHovered] = useState(false);

  // Animation

  const { scale, ...styleProps } = useSpring({
    boxShadow: isHovered ? '3px 5px 6px rgba(0, 0, 0, 0.5)' : '2px 4px 4px rgba(0, 0, 0, 0.3)',
    config: config.gentle,
    scale: isHovered ? 1.01 : 1,
  });

  // Return

  return (
    <AnimatedCard
      boxShadow='2px 4px 6px green'
      className='AnimatedLongCard'
      height='200px'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: scale.interpolate(scale => `scale(${scale})`),
        ...styleProps,
      }}
      styledFlex='center'
      {...props}
    >
      {children}
    </AnimatedCard>
  );
};

AnimatedLongCard.propTypes = {
  //
};

AnimatedLongCard.defaultProps = {
  //
};

export default AnimatedLongCard;
