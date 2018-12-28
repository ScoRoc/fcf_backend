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
    <section className='AllAnnouncements-section'>
      <h3>Current Announcements</h3>
      {allAnnouncements}
    </section>
  );
}

export default AllAnnouncements;
