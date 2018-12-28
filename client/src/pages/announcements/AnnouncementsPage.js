import React from 'react';
import axios from 'axios';

import './Announcements.min.css';
import AddAnnouncement from './AddAnnouncement';
import AllAnnouncements from './AllAnnouncements';
// import SubNav from '../../components/SubNav';

export default class AnnouncementsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: null,
    }
  }

  addAnnouncement = announcement => {
    const withNewAnnouncement = this.state.announcements;
    withNewAnnouncement.push(announcement);
    this.setState({ announcements: withNewAnnouncement });
  }

  componentDidMount() {
    axios.get('/announcements').then(result => {
      console.log('result.data: ', result.data);
      this.setState({ announcements: result.data.announcements });
    });
  }

  render() {
    const { announcements } = this.state;
    return (
      <>
        <h1>Accouncments</h1>
        <section className='AnnouncementsPage'>
          <AddAnnouncement addAnnouncement={this.addAnnouncement} />
          <AllAnnouncements announcements={announcements} />
        </section>
      </>
    );
  }
}
