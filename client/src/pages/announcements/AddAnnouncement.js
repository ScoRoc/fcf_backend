import React from 'react';
import axios from 'axios';

import TextAreaCharCount from '../../components/TextAreaCharCount';

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

  liftAnnouncementText = announcementText => {
    this.setState({ announcementText });
  }

  liftAnnouncementText = announcementText => {
    announcementText.length <= 150  ? this.setState({ charCount: announcementText.length, announcementText: announcementText })
                                    : this.setState({ charCount: announcementText.length - 1});
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
    const { announcementText } = this.state;
    return (
      <section className='AddAnnouncementSection'>
        <div className='AddAnnouncement'>
          <h3>Add an Announcement</h3>
          <form className='add-announcement-form' onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor='new-manager-email'>Announcement</label>
              <TextAreaCharCount
                charLimit={150}
                id='new-manager-email'
                liftText={this.liftAnnouncementText}
                pStyle={{ marginRight: '5%' }}
                textareaStyle={{
                  minHeight: '2.7em',
                  minWidth: '95%',
                  maxWidth: '95%',
                }}
                required
                text={announcementText}
              />
              </div>
            <button type='submit'>Add</button>
          </form>
        </div>
      </section>
    );
  }
}
