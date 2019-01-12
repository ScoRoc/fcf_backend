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
      const { text, url } = this.props;
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
    const { deleteAnnouncement, id, imgUrl, likes } = this.props;
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
          deleteOnClick={() => deleteAnnouncement(id)}
          doneOnClick={() => this.handleEditAnnouncement(announcementText, announcementUrl, id)}
          editOnClick={this.toggleEdit}
          useFirstState={!editable}
        />
      </div>
    );
  }
}
