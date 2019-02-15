import React from 'react';

import EventStrip from './EventStrip';

 const AllEvents = props => {
  const { events, deleteEvent, editEvent, showCurrentEvents, showPastEvents, toggleShowEvents } = props;
  const currentClass = showCurrentEvents ? 'filter-on' : 'filter-off';
  const pastClass = showPastEvents ?  'filter-on' : 'filter-off';
  const allEvents  = events
                          ? events.slice(0).map(event => (
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
  return (
    <>
      <h3 id='h3-AllEvents'>Current Events</h3>
      <section>
        <p className={`events-filter ${pastClass}`} onClick={() => toggleShowEvents('showPastEvents')}>Past Events</p>
        <p className={`events-filter ${currentClass}`} onClick={() => toggleShowEvents('showCurrentEvents')}>Current Events</p>
      </section>
      <section className='AllEvents'>
        {allEvents}
      </section>
    </>
  );
}

export default AllEvents;
