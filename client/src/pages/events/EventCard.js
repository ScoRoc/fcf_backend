// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Components
import { ItemCard } from 'components';
// Widgets
import { CardColumn, Separator, Text } from 'widgets';

// EventCard

const EventCard = ({ category, date, name, url, ...props }) => {
  return (
    <ItemCard className='EventCard' marginBottom='20px' {...props}>
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
    </ItemCard>
  );
};

EventCard.propTypes = {
  category: PropTypes.string,
  date: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
};

EventCard.defaultProps = {
  category: '',
  date: '',
  name: '',
  url: '',
};

export default EventCard;
