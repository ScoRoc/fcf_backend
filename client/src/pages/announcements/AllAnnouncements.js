import React from 'react';

 const AllAnnouncements = props => {
  const { announcements } = props;
  console.log('typeof : ', announcements)
  const allAnnouncements  = announcements
                          ? announcements.slice(0).reverse().map(announcement => {
                            return (
                              <div className='announcement-row' key={announcement._id}>
                                <p>{announcement.announcementText}</p>
                              </div>
                            )
                          })
                          : 'Loading...';
  return (
    <section className='AllAnnouncements-section'>
      <h3>Current Announcements</h3>
      {allAnnouncements}
    </section>
  );
}

export default AllAnnouncements;
