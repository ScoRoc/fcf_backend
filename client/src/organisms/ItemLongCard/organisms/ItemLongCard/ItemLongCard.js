// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { animated, config, useSpring } from 'react-spring';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Text } from 'atoms';
// Organisms
import Card, { AnimatedCard, CardColumn, Separator } from 'organisms/Card';

// ItemCard

const ItemCard = ({ children, ...props }) => {
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
      className='ItemCard'
      height='200px'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      padding='0 20px'
      style={{
        transform: scale.interpolate(scale => `scale(${scale})`),
        ...styleProps,
      }}
      styledFlex='center'
      {...props}
    >
      {children}
      <Separator />
      <CardColumn>
        <Text>[icon1] [number]</Text>
        <Text>[icon2] [number]</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>[edit] [trash]</Text>
      </CardColumn>
    </AnimatedCard>
  );
};

ItemCard.propTypes = {
  children: PropTypes.element,
};

ItemCard.defaultProps = {
  children: null,
};

export default ItemCard;
