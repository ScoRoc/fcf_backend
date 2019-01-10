import React from 'react';

import EventStrip from './EventStrip';

 const AllEvents = props => {
  const { events, deleteEvent, editEvent } = props;
  const allEvents  = events
                          ? events.slice(0).reverse().map(event => (
                            <EventStrip
                              allowTypingPastLimit={true}
                              charLimit={25}
                              deleteEvent={deleteEvent}
                              editEvent={editEvent}
                              id={event._id}
                              key={event._id}
                              likes={event.likes}
                              text={event.eventText}
                              startDate={event.startDate}
                              throughDate={event.throughDate}
                              types={event.types}
                              url={event.url || 'no url'}
                            />
                          ))
                          : <p className='f'>'Loading...'</p>;
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
