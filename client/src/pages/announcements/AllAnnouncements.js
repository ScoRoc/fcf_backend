import React from 'react';

import AnnouncementStrip from './AnnouncementStrip';

 const AllAnnouncements = props => {
  const { announcements, deleteAnnouncement, editAnnouncement } = props;
  const allAnnouncements  = announcements
                          ? announcements.slice(0).reverse().map(announcement => (
                            <AnnouncementStrip
                              announcement={announcement}
                              deleteAnnouncement={deleteAnnouncement}
                              editAnnouncement={editAnnouncement}
                              key={announcement._id}
                            />
                          ))
                          : <p>'Loading...'</p>;
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
