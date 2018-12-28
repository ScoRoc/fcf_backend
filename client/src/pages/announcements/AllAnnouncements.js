import React from 'react';
import axios from 'axios';

 const AllAnnouncements = props => {
  const { announcements } = props;
  const deleteAnnouncement = id => {
    axios({
      url: '/announcements',
      method: 'delete',
      data: { id },
    }).then(result => {
      console.log('result: ', result);
      props.deleteAnnouncement(id);
    });
  }
  const allAnnouncements  = announcements
                          ? announcements.slice(0).reverse().map(announcement => {
                            return (
                              <div className='announcement-row' key={announcement._id}>
                                <p>{announcement.announcementText}</p>
                                <button>Edit</button>
                                <button onClick={() => deleteAnnouncement(announcement._id)}>Delete</button>
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
