import React from 'react';

import EventStrip from './EventStrip';

 const AllEvents = props => {
  const { events, deleteEvent, editEvent } = props;
  if (events) {
    events.forEach(event => {
      console.log('startDate: ', event.startDate)
    })
  }
  const allEvents  = events
                          ? events.slice(0).reverse().map(event => (
                            <EventStrip
                              allowTypingPastLimit={true}
                              charLimit={25}
                              deleteEvent={deleteEvent}
                              editEvent={editEvent}
                              event={event}
                              key={event._id}
                            />
                          ))
                          : <p className='f'>'Loading...'</p>;
  // FILTER BY CURRENT AND PAST EVENTS
  // MAKE FILTER LIKE EVENTS ON APP
  // SORT BY DATE
  return (
    <>
      <h3 id='h3-AllEvents'>Current Events</h3>
      <section className='AllEvents'>
        {allEvents}
      </section>
    </>
  );
}

export default AllEvents;
