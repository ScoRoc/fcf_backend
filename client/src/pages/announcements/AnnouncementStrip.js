import React from 'react';

import AnnouncementTwoButtons from './AnnouncementTwoButtons';
import TwoStateTextInput from '../../components/TwoStateTextInput';
import TwoStateTextTACC from '../../components/TwoStateTextTACC';

import { isEqual, isLessThanOrEqual } from '../../utils/comparisons';

export default class AnnouncementStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTypingPastLimit: true,
      announcementText: '',
      announcementUrl: '',
      charCount: 0,
      charLimit: 150,
      editable: false,
      initialText: '',
      initialUrl: '',
    }
  }

  isEscapeKey = isEqual('Escape');

  isLTEtoCharLimit = () => isLessThanOrEqual(this.state.charLimit);

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
                      : this.isLTEtoCharLimit()(announcementText.length)
                        ? { charCount: announcementText.length, announcementText }
                        : { charCount: announcementText.length - 1 };
      return newState;
    });
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      const { announcement } = this.props;
      const { announcementText } = announcement;
      const url = announcement.url || 'no url';
      return {
        announcementText,
        announcementUrl: url,
        charCount: announcementText.length,
        initialText: announcementText,
        initialUrl: url,
      }
    });
  }

  render() {
    const { announcement, deleteAnnouncement } = this.props;
    const { _id, imgUrl, likes, public_id } = announcement;
    const { allowTypingPastLimit, announcementText, announcementUrl, editable } = this.state;
    const disabled = this.isLTEtoCharLimit()(announcementText.length) ? '' : 'disabled';
    return (
      <div className='AnnouncementStrip'>
        <TwoStateTextTACC
          allowTypingPastLimit={allowTypingPastLimit}
          charLimit={this.state.charLimit}
          focusTextarea={true}
          handleKeyUp={this.handleKeyUp}
          liftText={this.liftAnnouncementText}
          pClass='AnnouncementStrip__text-wrap__p'
          taccDivClass='AnnouncementStrip__text-wrap__div'
          taccPClass='AnnouncementStrip__text-wrap__div__p'
          taccTextareaClass='AnnouncementStrip__text-wrap__div__textarea'
          text={announcementText}
          useTACC={editable}
          wrapperClass='AnnouncementStrip__text-wrap'
        />
        <div className='AnnouncementStrip__info-div'>
          <TwoStateTextInput
            onChange={e => this.setState({ announcementUrl: e.target.value })}
            onKeyUp={this.handleKeyUp}
            pClass=''
            useInput={editable}
            value={announcementUrl}
          />
          <p>Likes: {likes || 'none'}</p>
          <img src={imgUrl} />
        </div>
        <AnnouncementTwoButtons
          cancelOnClick={this.cancelChange}
          disabled={disabled}
          deleteOnClick={() => deleteAnnouncement(_id, public_id)}
          doneOnClick={() => this.handleEditAnnouncement(announcementText, announcementUrl, _id)}
          editOnClick={this.toggleEdit}
          useFirstState={!editable}
        />
      </div>
    );
  }
}
