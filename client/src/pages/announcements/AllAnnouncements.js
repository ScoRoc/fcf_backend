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
                              imgUrl={announcement.imgUrl}
                              key={announcement._id}
                              likes={announcement.likes}
                              text={announcement.announcementText}
                              url={announcement.url || 'no url'}
                            />
                          ))
                          : <p className='f'>'Loading...'</p>;
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
