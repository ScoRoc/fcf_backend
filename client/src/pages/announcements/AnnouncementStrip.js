import React from 'react';

import TextAreaCharCount from '../../components/TextAreaCharCount';

export default class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props);
    this.charLimit = 150;
    this.state = {
      allowTypingPastLimit: true,
      announcementText: '',
      charCount: 0,
      editable: false,
    }
  }

  isTextLTEtoLimit = length => length <= this.charLimit;

  isTextGTEtoLimit = length => length >= this.charLimit;

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  handleEditAnnouncement = (announcementText, id) => {
    this.toggleEdit();
    this.props.editAnnouncement(announcementText, id);
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

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    value.length <= this.charLimit ? this.setState({ charCount: value.length, text: value })
                        : this.setState({ charCount: value.length - 1});
  }

  componentDidMount() {
    const { text } = this.props;
    this.setState({ announcementText: text, charCount: text.length })
  }

  render() {
    const { deleteAnnouncement, id } = this.props;
    const { allowTypingPastLimit, announcementText, editable } = this.state;
    const disabled = this.isTextLTEtoLimit(announcementText.length) ? '' : 'disabled';
    const btnText = editable ? 'Done' : 'Edit';
    const btnOnClick = editable ? () => this.handleEditAnnouncement(announcementText, id) : this.toggleEdit;
    const announcement  = editable
                        ? <TextAreaCharCount
                            allowTypingPastLimit={allowTypingPastLimit}
                            charLimit={this.charLimit}
                            liftText={this.liftAnnouncementText}
                            text={announcementText}
                            divClass='AnnouncementStrip__text-wrap__div'
                            pClass='AnnouncementStrip__text-wrap__div__p'
                            textareaClass='AnnouncementStrip__text-wrap__div__textarea'
                          />
                        : <p className='AnnouncementStrip__text-wrap__p'>
                            {announcementText}
                          </p>;
    return (
      <div className='AnnouncementStrip'>
        <div className='AnnouncementStrip__text-wrap'>
          {announcement}
        </div>
        <div className='AnnouncementStrip__likes-div'>
          <p>Likes: 1000</p>
        </div>
        <div className='AnnouncementStrip__btn-div'>
          <button className={disabled} disabled={disabled} onClick={btnOnClick}>{btnText}</button>
          <button onClick={() => deleteAnnouncement(id)}>Delete</button>
        </div>
      </div>
    );
  }
}
