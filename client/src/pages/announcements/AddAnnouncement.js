import React from 'react';
import axios from 'axios';

export default class AddAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcementText: '',
      charCount: 0,
    }
  }

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    this.props.addAnnouncement(data.announcement);
  }

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    value.length <= 150 ? this.setState({ charCount: value.length, announcementText: value })
                        : this.setState({ charCount: value.length - 1});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { announcementText } = this.state;
    axios.post('/announcements', { announcementText }).then(result => {
      const { data } = result;
      data.errors ? this.handleErrors(data) : this.handleSuccess(data);
      this.setState({ announcementText: '' });
    });
  }

  render() {
    // const text150 = 'de2100 iosdf;io haweoi;haow;ge haow glai;og ;ilagklawji;lgenalwgil/agaw;il gj;aw eg;liawieg l;naigalwg ;awk gniawln g;aw gn;awl ngilawngr ;ilgihwlgaw2';
    const { charCount, announcementText } = this.state;
    const turnRed = charCount === 150 ? 'warning-red' : '';
    return (
      <section className='AddAnnouncementSection'>
        <div className='AddAnnouncement'>
          <h3>Add an Announcement</h3>
          <form className='add-announcement-form' onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor='new-manager-email'>Announcement</label>
              <textarea
                onChange={this.handleChange}
                id='new-manager-email'
                required
                value={announcementText}
                ></textarea>
              </div>
            <button type='submit'>Add</button>
          </form>
          <p className={`${turnRed} char-count`}>{charCount} / 150</p>
        </div>
      </section>
    );
  }
}
