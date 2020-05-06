// Libraries
import React from 'react';
// Wods Templates
import WodsTemplate from '../../templates';

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

// WodsLogic

const WodsLogic = () => <WodsTemplate wods={wods} />;

export default WodsLogic;
