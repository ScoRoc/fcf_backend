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

// EventCard

const EventCard = ({ category, date, name, url, ...props }) => {
  return (
    <ItemLongCard className='EventCard' marginBottom='20px' {...props}>
      <CardColumn>
        <Text>{date}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{name}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{category}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{url}</Text>
      </CardColumn>
    </ItemLongCard>
  );
};

EventCard.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  category: null,
  date: null,
  name: null,
  url: null,
};

export default EventCard;
