import React from 'react';

import AnnouncementStrip from './AnnouncementStrip';

 const AllAnnouncements = props => {
  const { announcements, deleteAnnouncement, editAnnouncement } = props;
  const allAnnouncements  = announcements
                          ? announcements.slice(0).reverse().map(announcement => (
                            <AnnouncementStrip
                              deleteAnnouncement={deleteAnnouncement}
                              editAnnouncement={editAnnouncement}
                              id={announcement._id}
                              key={announcement._id}
                              text={announcement.announcementText}
                            />
                          ))
                          : 'Loading...';
  return (
    <>
    <h3 id='h3-AllAnnouncements'>Current Announcements</h3>
    <section className='AllAnnouncements'>
      {allAnnouncements}
    </section>
    </>
  );
}

export default AllAnnouncements;
