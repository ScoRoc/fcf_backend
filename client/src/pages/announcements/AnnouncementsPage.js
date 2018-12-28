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

  getIndexOfAnnouncement = id => {
    const { announcements } = this.state;
    return announcements.indexOf(announcements.find(announcement => announcement.id === id));
  }

  addAnnouncement = announcement => {
    this.setState(prevState => {
      const withNewAnnouncement = prevState.announcements;
      withNewAnnouncement.push(announcement);
      return { announcements: withNewAnnouncement };
    });
  }

  deleteAnnouncement = id => {
    const announcements = this.state.announcements.slice(0);
    axios({
      url: '/announcements',
      method: 'delete',
      data: { id },
    }).then(result => {
      console.log('result: ', result);
      announcements.splice(this.getIndexOfAnnouncement(id), 1);
      this.setState({ announcements });
    });
  }

  editAnnouncement = (announcementText, id) => {
    const announcements = this.state.announcements.slice(0);
    axios({
      url: '/announcements',
      method: 'put',
      data: { announcementText, id },
    }).then(result => {
      const { updatedAnnouncement } = result.data;
      announcements[this.getIndexOfAnnouncement(updatedAnnouncement._id)] = updatedAnnouncement.announcementText;
      this.setState({ announcements });
    });
  }

  componentDidMount() {
    axios.get('/announcements').then(result => {
      console.log('result.data from AnnouncementsPage: ', result.data);
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
          <AllAnnouncements
            announcements={announcements}
            deleteAnnouncement={this.deleteAnnouncement}
            editAnnouncement={this.editAnnouncement}
          />
        </section>
      </>
    );
  }
}