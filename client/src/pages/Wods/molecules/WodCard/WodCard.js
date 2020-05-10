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

// WodCard

const WodCard = ({
  onPencilIconClick,
  onTrashIconClick,
  wod,
  wod: { date, description, likedBy, name },
  ...props
}) => {
  const day = moment(date).format('D');
  const month = moment(date).format('MMM');
  const year = moment(date).format('YYYY');

  const formattedDate = `${month} ${day}, ${year}`;

  // Return

  return (
    <AnimatedLongCard className='WodCard' marginBottom='20px' showViewedBy={false} {...props}>
      <CardColumn>
        <Text>{formattedDate}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{name}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{description}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        {/* {showViewedBy && <Text>[icon1] {totalViewedBy}</Text>} */}
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

WodCard.propTypes = {
  onPencilIconClick: PropTypes.func.isRequired,
  onTrashIconClick: PropTypes.func.isRequired,
  wod: PropTypes.object,
};

WodCard.defaultProps = {
  onPencilIconClick: null,
  onTrashIconClick: null,
  wod: null,
};

export default WodCard;
