import React from 'react';
import axios from 'axios';

import AnnouncementStrip from './AnnouncementStrip';

 const AllAnnouncements = props => {
  const { announcements } = props;
  const deleteAnnouncement = id => {
    axios({
      url: '/announcements',
      method: 'delete',
      data: { id },
    }).then(result => {
      // console.log('result: ', result);
      props.deleteAnnouncement(id);
    });
  }
  const allAnnouncements  = announcements
                          ? announcements.slice(0).reverse().map(announcement => (
                            <AnnouncementStrip
                              deleteAnnouncement={deleteAnnouncement}
                              id={announcement._id}
                              key={announcement._id}
                              announcementText={announcement.announcementText}
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
