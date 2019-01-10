import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Announcements.min.css';
import AddAnnouncement from './AddAnnouncement';
import AllAnnouncements from './AllAnnouncements';

import { getIndex, addItemToStateArr } from '../../utils/helpers';
import useAxios from '../../utils/axios-helpers';
const path = '/announcements';
const { deleteWithAxios, editWithAxios } = useAxios(path);

class AnnouncementsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: null,
    }
  }

  addAnnouncement = announcement => {
    this.setState(prevState => {
      return addItemToStateArr(announcement, prevState, 'announcements');
    });
  }

  deleteAnnouncement = id => {
    const announcements = this.state.announcements.slice(0);
    deleteWithAxios({ id }).then(result => {
      // console.log('result: ', result);
      announcements.splice(getIndex(id, announcements), 1);
      this.setState({ announcements });
    });
  }

  editAnnouncement = (announcementText, url, id) => {
    const announcements = this.state.announcements.slice(0);
    editWithAxios({ announcementText, url, id }).then(result => {
      // const { updatedAnnouncement } = result.data;
      this.setState({ announcements });
    });
  }

  componentDidMount() {
    if (this.props.manager) {
      axios.get('/announcements').then(result => {
        this.setState({ announcements: result.data.announcements });
      });
    }
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    const { announcements } = this.state;
    return (
      <>
        <section className='AnnouncementsPage'>
          <h1>Accouncments</h1>
          <AddAnnouncement
            addAnnouncement={this.addAnnouncement}
            allowTypingPastLimit={true}
            charLimit={150}
          />
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

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
  };
};

export default connect(mapStateToProps)(AnnouncementsPage);
