// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Wods Components
import AddWod from './AddWod';
import WodCard from './WodCard';
// Components
import { CardPageLayout } from 'components';

// Placeholder

const wods = [
  {
    date: '[date1]',
    description: 'heres a lovely shovely wodily wod wod',
    name: 'Wod Name 1',
  },
  {
    date: '[date2]',
    description: 'heres a lovely shovely wodily wod wod',
    name: 'Wod Name 2',
  },
  {
    date: '[date3]',
    description: 'heres a lovely shovely wodily wod wod',
    name: 'Wod Name 3',
  },
  {
    date: '[date4]',
    description: 'heres a lovely shovely wodily wod wod',
    name: 'Wod Name 4',
  },
  {
    date: '[date5]',
    description: 'heres a lovely shovely wodily wod wod',
    name: 'Wod Name 5',
  },
];

// WodsPage

const WodsPage = props => {
  // Wods

  const wodCards = wods.map((wod, i) => {
    const { date, description, name } = wod;
    return <WodCard date={date} description={description} key={`${i}${name}`} name={name} />;
  });

  // Return

  return (
    <CardPageLayout className='WodsPage' title='WODs'>
      {wodCards}
    </CardPageLayout>
  );
};

WodsPage.propTypes = {
  //
};

WodsPage.defaultProps = {
  //
};

export default WodsPage;
