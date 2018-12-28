import React from 'react';
import { Route } from 'react-router-dom';

import './Announcements.min.css';
import SubNav from '../../components/SubNav';

const AnnouncementsPage = props => {
  return (
    <section className='AnnouncementsPage'>
      <SubNav page='announcements' />
      <span>accouncments</span>
    </section>
  );
}

export default AnnouncementsPage;
