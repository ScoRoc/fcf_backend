// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Components
import { ItemCard } from 'components';
// Widgets
import { CardColumn, Separator, Text } from 'widgets';

// WodCard

const WodCard = ({ date, description, name, ...props }) => {
  return (
    <ItemCard className='WodCard' marginBottom='20px' {...props}>
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
    </ItemCard>
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
