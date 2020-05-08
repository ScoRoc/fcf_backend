// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { config, useSpring } from 'react-spring';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Text } from 'atoms';
// Organisms
import { AnimatedCard, CardColumn, Separator } from 'organisms/Card';

// ItemCard

const ItemCard = ({
  children,
  deleteItem,
  setIsModalOpen,
  showViewedBy,
  totalLiked,
  totalViewedBy,
  ...props
}) => {
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
        {showViewedBy && <Text>[icon1] {totalViewedBy}</Text>}
        <Text>[icon2] {totalLiked}</Text>
      </CardColumn>
      <Separator />
      <CardColumn flexDirection='row'>
        <Text cursor='pointer' onClick={setIsModalOpen}>
          [edit]
        </Text>
        <Text cursor='pointer' onClick={deleteItem}>
          [trash]
        </Text>
      </CardColumn>
    </AnimatedCard>
  );
};

ItemCard.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  showViewedBy: PropTypes.bool,
  totalLiked: PropTypes.number,
  totalViewedBy: PropTypes.number,
};

ItemCard.defaultProps = {
  deleteItem: null,
  setIsModalOpen: null,
  showViewedBy: true,
  totalLiked: null,
  totalViewedBy: null,
};

export default ItemCard;