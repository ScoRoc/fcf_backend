import React from 'react';
import { Route } from 'react-router-dom';

import './Announcements.min.css';
import AddAnnouncement from './AddAnnouncement';
import AllAnnouncements from './AllAnnouncements';
// import SubNav from '../../components/SubNav';

const AnnouncementsPage = props => {
  return (
    <>
      <h1>Accouncments</h1>
      <section className='AnnouncementsPage'>
        <AddAnnouncement />
        <AllAnnouncements />
      </section>
    </>
  );
}

export default AnnouncementsPage;
