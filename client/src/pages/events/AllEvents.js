import React from 'react';

import EventStrip from './EventStrip';

 const AllEvents = props => {
  const { announcements, deleteAnnouncement, editAnnouncement } = props;
  const allAnnouncements  = announcements
                          ? announcements.slice(0).reverse().map(announcement => (
                            <EventStrip
                              deleteAnnouncement={deleteAnnouncement}
                              editAnnouncement={editAnnouncement}
                              id={announcement._id}
                              key={announcement._id}
                              likes={announcement.likes}
                              text={announcement.announcementText}
                              url={announcement.url || 'no url'}
                            />
                          ))
                          : <p className='f'>'Loading...'</p>;
  return (
    <>
    <h3 id='h3-AllEvents'>Current Events</h3>
    <section className='AllEvents'>
      {/* {allAnnouncements} */}
      <p>yo all events yo</p>
    </section>
    </>
  );
}

export default AllEvents;
