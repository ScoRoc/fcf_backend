// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Announcement Components
// import AddAnnouncement from './AddAnnouncement';
import AnnouncementCard from './AnnouncementCard';
// Components
import { CardPageLayout } from 'components';

// Placeholder

const announcements = [
  {
    description: 'here is todays announcement yay fun stuff time',
    img: '[img1]',
    url: 'http://www.google.com',
  },
  {
    description: 'here is todays announcement yay fun stuff time',
    img: '[img2]',
    url: 'http://www.google.com',
  },
  {
    description: 'here is todays announcement yay fun stuff time',
    img: '[img3]',
    url: 'http://www.google.com',
  },
  {
    description: 'here is todays announcement yay fun stuff time',
    img: '[img4]',
    url: 'http://www.google.com',
  },
  {
    description: 'here is todays announcement yay fun stuff time',
    img: '[img5]',
    url: 'http://www.google.com',
  },
];

// AnnouncementsPage

const AnnouncementsPage = props => {
  // Wods

  const announcementCards = announcements.map((announcement, i) => {
    const { description, img, url } = announcement;
    return <AnnouncementCard description={description} img={img} key={`${i}${url}`} url={url} />;
  });

  // Return

  return (
    <CardPageLayout className='AnnouncementsPage' title='Announcements'>
      {announcementCards}
    </CardPageLayout>
  );
};

AnnouncementsPage.propTypes = {
  //
};

AnnouncementsPage.defaultProps = {
  //
};

export default AnnouncementsPage;
