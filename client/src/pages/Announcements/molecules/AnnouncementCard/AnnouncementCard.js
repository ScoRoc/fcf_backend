// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
import ItemLongCard from 'organisms/ItemLongCard';

// AnnouncementCard

const AnnouncementCard = ({ description, img, url, ...props }) => {
  return (
    <ItemLongCard className='AnnouncementCard' marginBottom='20px' {...props}>
      <CardColumn>
        <Text>{img}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{description}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{url}</Text>
      </CardColumn>
    </ItemLongCard>
  );
};

AnnouncementCard.propTypes = {
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

AnnouncementCard.defaultProps = {
  description: null,
  img: null,
  url: null,
};

export default AnnouncementCard;