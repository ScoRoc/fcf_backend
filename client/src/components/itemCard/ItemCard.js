// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Card, CardColumn, Separator, Text } from 'widgets';

// ItemCard

const ItemCard = ({ children, ...props }) => {
  return (
    <Card
      boxShadow='2px 4px 6px green'
      className='ItemCard'
      height='200px'
      padding='0 20px'
      styledFlex='center'
      {...props}
    >
      {children}
      <Separator />
      <CardColumn>
        <Text>[icon1] [number]</Text>
        <Text>[icon2] [number]</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>[edit] [trash]</Text>
      </CardColumn>
    </Card>
  );
};

ItemCard.propTypes = {
  children: PropTypes.element,
};

ItemCard.defaultProps = {
  children: null,
};

export default ItemCard;
