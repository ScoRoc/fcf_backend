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

// WodCard

const WodCard = ({ date, description, name, ...props }) => {
  return (
    <ItemLongCard className='WodCard' marginBottom='20px' {...props}>
      <CardColumn>
        <Text>{date}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{name}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{description}</Text>
      </CardColumn>
    </ItemLongCard>
  );
};

WodCard.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
};

WodCard.defaultProps = {
  date: '',
  description: '',
  name: '',
};

export default WodCard;
