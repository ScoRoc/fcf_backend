// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Components
import { ItemCard } from 'components';
// Widgets
import { CardColumn, Separator, Text } from 'widgets';

// AnnouncementCard

const AnnouncementCard = ({ description, img, url, ...props }) => {
  return (
    <ItemCard className='AnnouncementCard' marginBottom='20px' {...props}>
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
    </ItemCard>
  );
};

AnnouncementCard.propTypes = {
  description: PropTypes.string,
  img: PropTypes.string,
  url: PropTypes.string,
};

AnnouncementCard.defaultProps = {
  description: '',
  img: '',
  url: '',
};

export default AnnouncementCard;
