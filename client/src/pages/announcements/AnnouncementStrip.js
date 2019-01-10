import React from 'react';

import TextAreaCharCount from '../../components/TextAreaCharCount';

import { isEqual, isLessThanOrEqual } from '../../utils/comparisons';

export default class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props);
    this.charLimit = 150;
    this.state = {
      allowTypingPastLimit: true,
      announcementText: '',
      announcementUrl: '',
      charCount: 0,
      editable: false,
      initialText: '',
      initialUrl: '',
    }
  }

  isEscapeKey = isEqual('Escape');

  isTextLTEtoLimit = () => isLessThanOrEqual(this.charLimit);

  cancelChange = () => {
    this.setState((prevState, props) => {
      const { initialText, initialUrl } = prevState;
      return {
        announcementText: initialText,
        announcementUrl: initialUrl,
        charCount: initialText.length,
        editable: false,
      }
    });
  }

  handleKeyUp = e => {
    e.preventDefault();
    if ( this.isEscapeKey(e.key) ) this.cancelChange();
  }

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  handleEditAnnouncement = (announcementText, url, id) => {
    this.toggleEdit();
    this.props.editAnnouncement(announcementText, url, id);
    this.setState({ initialText: announcementText, initialUrl: url });
  }

  liftAnnouncementText = announcementText => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: announcementText.length, announcementText }
                      : this.isTextLTEtoLimit()(announcementText.length)
                        ? { charCount: announcementText.length, announcementText }
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
    const { text, url } = this.props;
    this.setState((prevState, props) => {
      return {
        announcementText: text,
        announcementUrl: url,
        charCount: text.length,
        initialText: text,
        initialUrl: url,
      }
    });
  }

  render() {
    const { deleteAnnouncement, id, likes } = this.props;
    const { allowTypingPastLimit, announcementText, announcementUrl, editable } = this.state;
    const disabled = this.isTextLTEtoLimit()(announcementText.length) ? '' : 'disabled';
    const btnText = editable ? 'Done' : 'Edit';
    const editDoneBtnClass = editable ? 'done-btn' : 'edit-btn';
    const btnOnClick  = editable
                      ? () => this.handleEditAnnouncement(announcementText, announcementUrl, id)
                      : this.toggleEdit;
    const announcement  = editable
                        ? <TextAreaCharCount
                            allowTypingPastLimit={allowTypingPastLimit}
                            charLimit={this.charLimit}
                            focusTextarea={true}
                            handleKeyUp={this.handleKeyUp}
                            liftText={this.liftAnnouncementText}
                            text={announcementText}
                            divClass='AnnouncementStrip__text-wrap__div'
                            pClass='AnnouncementStrip__text-wrap__div__p'
                            textareaClass='AnnouncementStrip__text-wrap__div__textarea'
                          />
                        : <p className='AnnouncementStrip__text-wrap__p'>
                            {announcementText}
                          </p>;
    const displayUrl = editable
                          ? <input
                              onChange={e => this.setState({ announcementUrl: e.target.value })}
                              onKeyUp={this.handleKeyUp}
                              type='text'
                              value={announcementUrl}
                            />
                          : <p>{announcementUrl}</p>;
    return (
      <div className='AnnouncementStrip'>
        <div className='AnnouncementStrip__text-wrap'>
          {announcement}
        </div>
        <div className='AnnouncementStrip__info-div'>
          {displayUrl}
          <p>Likes: {likes || 'none'}</p>
        </div>
        <div className='AnnouncementStrip__btn-div'>
          <button className={`${editDoneBtnClass} ${disabled}`} disabled={disabled} onClick={btnOnClick}>{btnText}</button>
          <button className='delete-btn' onClick={() => deleteAnnouncement(id)}>Delete</button>
        </div>
      </div>
    );
  }
}
