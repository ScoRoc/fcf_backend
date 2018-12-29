import React from 'react';
import axios from 'axios';

import TextAreaCharCount from '../../components/TextAreaCharCount';

export default class AddAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTypingPastLimit: false,
      announcementText: '',
      charCount: 0,
      charLimit: 150,
    }
  }

  isTextLTEtoLimit = length => length <= this.state.charLimit;

  isTextGTEtoLimit = length => length >= this.state.charLimit;

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    this.props.addAnnouncement(data.announcement);
  }

  liftAnnouncementText = announcementText => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: announcementText.length, announcementText: announcementText }
                      : this.isTextLTEtoLimit(announcementText.length)
                        ? { charCount: announcementText.length, announcementText: announcementText }
                        : { charCount: announcementText.length - 1 };
      return newState;
    });
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

  componentDidMount() {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit } = props;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charLimit: charLimit || 150,
      };
    });
  }

  render() {
    const { allowTypingPastLimit, announcementText, charLimit } = this.state;
    const disabled = this.isTextLTEtoLimit(announcementText.length) ? '' : 'disabled';
    return (
      <section className='AddAnnouncement'>
        <form className='AddAnnouncement__form' onSubmit={this.handleSubmit}>
          <div className='AddAnnouncement__form__div'>
            <label htmlFor='new-manager-email'>Add Announcement</label>
            <TextAreaCharCount
              allowTypingPastLimit={allowTypingPastLimit}
              charLimit={charLimit}
              id='new-manager-email'
              liftText={this.liftAnnouncementText}
              divClass='AddAnnouncement__form__text-wrap-div'
              pClass='AddAnnouncement__form__text-wrap-div__p'
              textareaClass='AddAnnouncement__form__text-wrap-div__textarea'
              required
              text={announcementText}
            />
            </div>
          <button className={disabled} disabled={disabled} type='submit'>Add Announcement</button>
        </form>
      </section>
    );
  }
}
