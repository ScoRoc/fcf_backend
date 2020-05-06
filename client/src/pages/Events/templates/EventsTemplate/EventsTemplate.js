// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import CardPageLayout from 'organisms/CardPageLayout';
import Modal from 'organisms/Modal';
// Event Organisms
// import AddEvent from './AddEvent';
import { EventCard } from '../../organisms';

// Placeholder

const events = [
  {
    category: 'social',
    date: '[date1]',
    name: 'Event Name 1',
    url: 'http://www.google.com',
  },
  {
    category: 'competition',
    date: '[date2]',
    name: 'Event Name 2',
    url: 'http://www.google.com',
  },
  {
    category: 'community',
    date: '[date3]',
    name: 'Event Name 3',
    url: 'http://www.google.com',
  },
  {
    category: 'social',
    date: '[date4]',
    name: 'Event Name 4',
    url: 'http://www.google.com',
  },
  {
    category: 'competition',
    date: '[date5]',
    name: 'Event Name 5',
    url: 'http://www.google.com',
  },
];

// EventsPage

const EventsPage = props => {
  // Wods

  const eventCards = events.map((event, i) => {
    const { category, date, name, url } = event;
    return <EventCard category={category} date={date} key={`${i}${name}`} name={name} url={url} />;
  });

  // Return

  return (
    <CardPageLayout className='EventsPage' title='Events'>
      {eventCards}

      <Modal>
        <p>Events Modal</p>
      </Modal>
    </CardPageLayout>
  );
};

EventsPage.propTypes = {
  //
};

EventsPage.defaultProps = {
  //
};

export default EventsPage;
