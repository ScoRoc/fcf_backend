import React from 'react';

import EventCheckboxes from './EventCheckboxes';
import TextAreaCharCount from '../../components/TextAreaCharCount';

import { addItemToStateArr, removeItemFromStateArr } from '../../utils/helpers';
import { isEqual, isGreaterThan, isLessThanOrEqual } from '../../utils/comparisons';

export default class EventStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTypingPastLimit: true,
      charCount: 0,
      charLimit: 25,
      editable: false,
      eventText: '',
      eventUrl: '',
      types: [],

      initialText: '',
      initialTypes: [],
      initialUrl: '',
    }
  }

  isEscapeKey = isEqual('Escape');
  isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);
  isTypesNotEmpty = () => isGreaterThan(0);

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

  liftInput = e => {
    const { checked, value } = e.target;
    this.setState(prevState => {
      const newState  = checked
                      ? addItemToStateArr(value, prevState, 'types')
                      : removeItemFromStateArr(value, prevState, 'types');
      return newState;
    });
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
        charCount: event.eventText.length,
        charLimit: charLimit || 25,
        eventText: event.eventText,
        eventUrl: event.url,
        types: event.types,
        initialText: event.eventText,
        initialTypes: event.types,
        initialUrl: event.url,
      }
    });
  }

  render() {
    const { allowTypingPastLimit, eventText, eventUrl, editable, types } = this.state;
    const { deleteEvent, event } = this.props;
    const { likes, startDate, throughDate } = event;
    const id = event._id;
    const url = event.url || 'no url'
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', {timeZone: 'UTC'});
    const formattedThroughDate = throughDate ? new Date(throughDate).toLocaleDateString('en-US', {timeZone: 'UTC'}) : 'None';
    const disabled  = this.isTextLTEtoLimit()(eventText.length) && this.isTypesNotEmpty()(types.length)
                    ? ''
                    : 'disabled';
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
    const displayTypes  = editable
                        ? <EventCheckboxes liftInput={this.liftInput} types={types} />
                        : types.map((type, i) => <p key={i}>{type}</p>);
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
