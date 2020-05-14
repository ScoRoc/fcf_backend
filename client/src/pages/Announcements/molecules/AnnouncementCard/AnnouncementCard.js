// Libraries
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
import AnimatedLongCard from 'organisms/AnimatedLongCard';
// Announcement Molecules
import AnnouncementImage from '../AnnouncementImage/AnnouncementImage';

// AnnouncementCard

const AnnouncementCard = ({
  announcement,
  announcement: { description, image, likedBy, url, viewedBy },
  onPencilIconClick,
  onTrashIconClick,
  ...props
}) => {
  // State

  const [cardHeight, setCardHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Callback Ref

  const cardRef = useCallback(node => {
    if (node !== null) {
      setCardHeight(node.getBoundingClientRect().height);
    }
  }, []);

  // Functions

  const handlePencilIconClick = async () => {
    setIsLoading(true);
    const result = await onPencilIconClick();
    setIsLoading(false);
  };

  const handleTrashIconClick = async () => {
    setIsLoading(true);
    const result = await onTrashIconClick();
    setIsLoading(false);
  };

  // Return

  return (
    <AnimatedLongCard className='AnnouncementCard' marginBottom='20px' {...props}>
      <CardColumn ref={cardRef}>
        <AnnouncementImage height={cardHeight} src={image?.cloudinary?.eagerUrl} />
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{description}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{url}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>[icon1] {viewedBy.length}</Text>
        <Text>[icon2] {likedBy.length}</Text>
      </CardColumn>
      <Separator />
      <CardColumn flexDirection='row'>
        <Text cursor='pointer' onClick={handlePencilIconClick}>
          [edit]
        </Text>
        <Text cursor='pointer' onClick={handleTrashIconClick}>
          [trash]
        </Text>
        {isLoading && <Text>Loading...</Text>}
      </CardColumn>
    </AnimatedLongCard>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.object,
  onPencilIconClick: PropTypes.func.isRequired,
  onTrashIconClick: PropTypes.func.isRequired,
};

AnnouncementCard.defaultProps = {
  announcement: null,
  onPencilIconClick: null,
  onTrashIconClick: null,
};

export default AnnouncementCard;
