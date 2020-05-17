// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';
// Organisms
import Card, { CardColumn } from 'organisms/Card';

// UserPageCard

const UserPageCard = ({ direction, items, title, ...props }) => {
  const _items = items.map((item, i) => {
    return (
      <CardColumn key={`${i}${item.name}`}>
        <Text>{item.name}</Text>
        <Text>{item.value}</Text>
      </CardColumn>
    );
  });
  return (
    <Box styledFlex='stretch space-between column' {...props}>
      <Text marginBottom='10px'>{title}</Text>
      <Card backgroundColor='slateblue' flex={1} styledFlex='stretch space-between'>
        {_items}
      </Card>
    </Box>
  );
};

UserPageCard.propTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

UserPageCard.defaultProps = {
  direction: 'row',
  items: null,
  title: null,
};

export default UserPageCard;
