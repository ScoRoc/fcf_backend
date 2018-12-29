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
      <section className='AddAnnouncement'>
        <form className='AddAnnouncement__form' onSubmit={this.handleSubmit}>
          <div className='AddAnnouncement__form__div'>
            <label htmlFor='new-manager-email'>Add Announcement</label>
            <TextAreaCharCount
              charLimit={150}
              id='new-manager-email'
              liftText={this.liftAnnouncementText}
              divClass='AddAnnouncement__form__text-wrap-div'
              pClass='AddAnnouncement__form__text-wrap-div__p'
              textareaClass='AddAnnouncement__form__text-wrap-div__textarea'
              required
              text={announcementText}
            />
            </div>
          <button type='submit'>Add Announcement</button>
        </form>
      </section>
    );
  }
}
