import React from 'react';

import TextAreaCharCount from '../../components/TextAreaCharCount';

import { isEqual, isLessThanOrEqual } from '../../utils/comparisons';

export default class EventStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTypingPastLimit: true,
      eventText: '',
      eventUrl: '',
      charCount: 0,
      charLimit: 25,
      editable: false,
      initialText: '',
      initialUrl: '',
    }
  }

  isEscapeKey = isEqual('Escape');

  isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);

  cancelChange = () => {
    this.setState((prevState, props) => {
      const { initialText, initialUrl } = prevState;
      return {
        eventText: initialText,
        eventUrl: initialUrl,
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

  handleEditEvent = (eventText, url, id) => {
    this.toggleEdit();
    this.props.editEvent(eventText, url, id);
    this.setState({ initialText: eventText, initialUrl: url });
  }

  liftEventText = eventText => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: eventText.length, eventText }
                      : this.isTextLTEtoLimit()(eventText.length)
                        ? { charCount: eventText.length, eventText }
                        : { charCount: eventText.length - 1 };
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
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit, event } = this.props;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charLimit: charLimit || 25,
        eventText: event.eventText,
        eventUrl: event.url,
        charCount: event.eventText.length,
        initialText: event.eventText,
        initialUrl: event.url,
      }
    });
  }

  render() {
    const { allowTypingPastLimit, eventText, eventUrl, editable } = this.state;
    const { deleteEvent, event } = this.props;
    const { likes, startDate, throughDate, types } = event;
    const id = event._id;
    const url = event.url || 'no url'
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {timeZone: 'UTC'});
    const formattedThroughDate = throughDate ? new Date(throughDate).toLocaleDateString('en-US', {timeZone: 'UTC'}) : 'None';
    const disabled = this.isTextLTEtoLimit()(eventText.length) ? '' : 'disabled';
    const btnText = editable ? 'Done' : 'Edit';
    const editDoneBtnClass = editable ? 'done-btn' : 'edit-btn';
    const btnOnClick  = editable
                      ? () => this.handleEditEvent({eventText, id, startDate, types, url: eventUrl, throughDate})
                      : this.toggleEdit;
    const text  = editable
                        ? <TextAreaCharCount
                            allowTypingPastLimit={allowTypingPastLimit}
                            charLimit={this.state.charLimit}
                            focusTextarea={true}
                            handleKeyUp={this.handleKeyUp}
                            liftText={this.liftEventText}
                            text={eventText}
                            divClass='EventStrip__text-wrap__div'
                            pClass='EventStrip__text-wrap__div__p'
                            textareaClass='EventStrip__text-wrap__div__textarea'
                          />
                        : <p className='EventStrip__text-wrap__p'>
                            {eventText}
                          </p>;
    const displayUrl = editable
                          ? <input
                              onChange={e => this.setState({ eventUrl: e.target.value })}
                              onKeyUp={this.handleKeyUp}
                              type='text'
                              value={eventUrl}
                            />
                          : <p>{eventUrl}</p>;
    const displayTypes = types.map((type, i) => <p key={i}>{type}</p>)
    return (
      <div className='EventStrip'>
        <div className='EventStrip__text-wrap'>
          {text}
        </div>
        <div className='EventStrip__info-div'>
          {displayUrl}
          <p>Likes: {likes || 'none'}</p>
          {displayTypes}
          <p>Start Date: {formattedStartDate}</p>
          <p>Through Date: {formattedThroughDate}</p>
        </div>
        <div className='EventStrip__btn-div'>
          <button className={`${editDoneBtnClass} ${disabled}`} disabled={disabled} onClick={btnOnClick}>{btnText}</button>
          <button className='delete-btn' onClick={() => deleteEvent(id)}>Delete</button>
        </div>
      </div>
    );
  }
}
