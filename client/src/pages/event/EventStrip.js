import React from 'react';

import EventRadioButtons from './EventRadioButtons';
import EventTwoButtons from './EventTwoButtons';
import TwoStateTextInput from '../../components/components/TwoStateTextInput';
import TwoStateTextTACC from '../../components/components/TwoStateTextTACC';

import { addItemToStateArr, removeItemFromStateArr } from '../../utils/OLD-helpers';
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
      startDate: '',
      throughDate: '',
      type: '',

      initalStartDate: '',
      initialText: '',
      initialThroughDate: '',
      initialType: '',
      initialUrl: '',
    };
  }

  isEscapeKey = isEqual('Escape');
  isLTEtoCharLimit = () => isLessThanOrEqual(this.state.charLimit);
  hasTypes = () => isGreaterThan(0);

  cancelChange = () => {
    this.setState((prevState, props) => {
      const {
        initialStartDate,
        initialText,
        initialThroughDate,
        initialType,
        initialUrl,
      } = prevState;
      return {
        charCount: initialText.length,
        editable: false,
        eventText: initialText,
        eventUrl: initialUrl,
        startDate: initialStartDate,
        throughDate: initialThroughDate,
        type: initialType,
      };
    });
  };

  handleKeyUp = e => {
    e.preventDefault();
    if (this.isEscapeKey(e.key)) this.cancelChange();
  };

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable });
  };

  handleEditEvent = ({ eventText, _id, startDate, type, url, throughDate }) => {
    this.toggleEdit();
    this.props.editEvent({ eventText, _id, startDate, type, url, throughDate });
    this.setState({
      initialStartDate: startDate,
      initialText: eventText,
      initialThroughDate: throughDate,
      initialType: type,
      initialUrl: url,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => {
      return { [name]: value };
    });
  };

  updateType = e => {
    this.setState({ type: e.target.value });
  };

  liftEventText = eventText => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState = allowTypingPastLimit
        ? { charCount: eventText.length, eventText }
        : this.isLTEtoCharLimit()(eventText.length)
        ? { charCount: eventText.length, eventText }
        : { charCount: eventText.length - 1 };
      return newState;
    });
  };

  componentDidMount() {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit, event } = this.props;
      const { eventText, startDate, throughDate, type, url } = event;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charCount: eventText.length,
        charLimit: charLimit || 25,
        eventText,
        eventUrl: url,
        startDate: startDate,
        throughDate: throughDate,
        type,
        initialStartDate: startDate,
        initialText: eventText,
        initialThroughDate: throughDate,
        initialType: type,
        initialUrl: url,
      };
    });
  }

  render() {
    const {
      allowTypingPastLimit,
      eventText,
      eventUrl,
      editable,
      startDate,
      throughDate,
      type,
    } = this.state;
    const { deleteEvent, event } = this.props;
    const { _id, likes } = event;
    const defaultStartDate = new Date(startDate || new Date()).toISOString().substr(0, 10);
    const formattedStartDate = startDate
      ? new Date(startDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
      : 'None';
    const defaultThroughDate = new Date(throughDate || startDate || new Date())
      .toISOString()
      .substr(0, 10);
    const formattedThroughDate = throughDate
      ? new Date(throughDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
      : 'None';
    const disabled = this.isLTEtoCharLimit()(eventText.length) ? '' : 'disabled';
    const displayTypes = editable ? (
      <EventRadioButtons handleOnChange={this.updateType} type={type} />
    ) : (
      <p className='capitalize'>{type}</p>
    );
    const displayStartDate = editable ? (
      <input name='startDate' onChange={this.handleChange} type='date' value={defaultStartDate} />
    ) : (
      <p>Start Date: {formattedStartDate}</p>
    );
    const displayThroughDate = editable ? (
      <input
        name='throughDate'
        onChange={this.handleChange}
        type='date'
        value={defaultThroughDate}
      />
    ) : (
      <p>Through Date: {formattedThroughDate}</p>
    );
    const clearThroughDateButton = editable ? (
      <button onClick={() => this.setState({ throughDate: '' })}>Clear Through Date</button>
    ) : (
      ''
    );
    return (
      <div className='EventStrip'>
        <TwoStateTextTACC
          allowTypingPastLimit={allowTypingPastLimit}
          charLimit={this.state.charLimit}
          focusTextarea={true}
          handleKeyUp={this.handleKeyUp}
          liftText={this.liftEventText}
          pClass='EventStrip__text-wrap__p'
          taccDivClass='EventStrip__text-wrap__div'
          taccPClass='EventStrip__text-wrap__div__p'
          taccTextareaClass='EventStrip__text-wrap__div__textarea'
          text={eventText}
          useTACC={editable}
          wrapperClass='EventStrip__text-wrap'
        />
        <div className='EventStrip__info-div'>
          <TwoStateTextInput
            onChange={e => this.setState({ eventUrl: e.target.value })}
            onKeyUp={this.handleKeyUp}
            pClass=''
            useInput={editable}
            value={eventUrl}
          />
          <p>Likes: {likes.length || 'None'}</p>
          {displayTypes}
          {displayStartDate}
          {displayThroughDate}
          {clearThroughDateButton}
        </div>
        <EventTwoButtons
          cancelOnClick={this.cancelChange}
          disabled={disabled}
          deleteOnClick={() => deleteEvent(_id)}
          doneOnClick={() =>
            this.handleEditEvent({ eventText, _id, startDate, type, url: eventUrl, throughDate })
          }
          editOnClick={this.toggleEdit}
          useFirstState={!editable}
        />
      </div>
    );
  }
}
