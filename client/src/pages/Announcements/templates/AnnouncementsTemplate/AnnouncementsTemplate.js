// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import CardPageLayout from 'organisms/CardPageLayout';
import Modal from 'organisms/Modal';
// Announcement Molecules
import { AnnouncementCard } from '../../molecules';
// Announcement Organisms
// import AddAnnouncement from './AddAnnouncement';

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

// AnnouncementsTemplate

const AnnouncementsTemplate = props => {
  // Wods

  const announcementCards = announcements.map((announcement, i) => {
    const { description, img, url } = announcement;
    return <AnnouncementCard description={description} img={img} key={`${i}${url}`} url={url} />;
  });

  // Return

  return (
    <CardPageLayout className='AnnouncementsTemplate' title='Announcements'>
      {announcementCards}

      <Modal>
        <p>Announcements Modal</p>
      </Modal>
    </CardPageLayout>
  );
};

AnnouncementsTemplate.propTypes = {
  //
};

AnnouncementsTemplate.defaultProps = {
  //
};

export default AnnouncementsTemplate;
