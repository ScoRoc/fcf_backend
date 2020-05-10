// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
import AnimatedLongCard from 'organisms/AnimatedLongCard';

// EventCard

const EventCard = ({
  event,
  event: { endDate, likedBy, name, startDate, type, url, viewedBy },
  onPencilIconClick,
  onTrashIconClick,
  ...props
}) => {
  const formatDate = date => {
    if (!date) return 'no end date';

    const day = moment(date).format('D');
    const month = moment(date).format('MMM');
    const year = moment(date).format('YYYY');

    return `${month} ${day}, ${year}`;
  };

  const formattedEndDate = formatDate(endDate);
  const formattedStartDate = formatDate(startDate);

  return (
    <AnimatedLongCard className='EventCard' marginBottom='20px' {...props}>
      <CardColumn>
        <Text>
          {formattedStartDate} - {formattedEndDate}
        </Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{name}</Text>
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
        <Text cursor='pointer' onClick={onPencilIconClick}>
          [edit]
        </Text>
        <Text cursor='pointer' onClick={onTrashIconClick}>
          [trash]
        </Text>
      </CardColumn>
    </AnimatedLongCard>
  );
};

EventCard.propTypes = {
  event: PropTypes.object,
  onPencilIconClick: PropTypes.func.isRequired,
  onTrashIconClick: PropTypes.func.isRequired,
};

EventCard.defaultProps = {
  event: null,
  onPencilIconClick: null,
  onTrashIconClick: null,
};

export default EventCard;
