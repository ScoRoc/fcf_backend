import React from 'react';

import EventCheckboxes from './EventCheckboxes';
import EventTwoButtons from './EventTwoButtons';
import TwoStateTextInput from '../../components/TwoStateTextInput';
import TwoStateTextTACC from '../../components/TwoStateTextTACC';

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
      startDate: '',
      throughDate: '',
      types: [],

      initalStartDate: '',
      initialText: '',
      initialThroughDate: '',
      initialTypes: [],
      initialUrl: '',
    }
  }

  isEscapeKey = isEqual('Escape');
  isLTEtoCharLimit = () => isLessThanOrEqual(this.state.charLimit);
  hasTypes = () => isGreaterThan(0);

  cancelChange = () => {
    this.setState((prevState, props) => {
      const { initialStartDate, initialText, initialThroughDate, initialTypes, initialUrl } = prevState;
      return {
        charCount: initialText.length,
        editable: false,
        eventText: initialText,
        eventUrl: initialUrl,
        startDate: initialStartDate,
        throughDate: initialThroughDate,
        types: initialTypes,
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

  handleEditEvent = ({eventText, _id, startDate, types, url, throughDate}) => {
    this.toggleEdit();
    this.props.editEvent({eventText, _id, startDate, types, url, throughDate});
    this.setState({
      initialStartDate: startDate,
      initialText: eventText,
      initialThroughDate: throughDate,
      initialTypes: types,
      initialUrl: url
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => {
      return { [name]: value }
    });
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
                      : this.isLTEtoCharLimit()(eventText.length)
                        ? { charCount: eventText.length, eventText }
                        : { charCount: eventText.length - 1 };
      return newState;
    });
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit, event } = this.props;
      const { eventText, startDate, throughDate, types, url } = event;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charCount: eventText.length,
        charLimit: charLimit || 25,
        eventText,
        eventUrl: url,
        startDate: startDate,
        throughDate: throughDate,
        types,
        initialStartDate: startDate,
        initialText: eventText,
        initialThroughDate: throughDate,
        initialTypes: types,
        initialUrl: url,
      }
    });
  }

  render() {
    const { allowTypingPastLimit, eventText, eventUrl, editable, startDate, throughDate, types } = this.state;
    const { deleteEvent, event } = this.props;
    const { _id, likes } = event;
    const defaultStartDate = new Date(startDate || new Date()).toISOString().substr(0, 10);
    const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString('en-US', {timeZone: 'UTC'}) : 'None';
    const defaultThroughDate = new Date(throughDate || startDate || new Date()).toISOString().substr(0, 10);
    const formattedThroughDate = throughDate ? new Date(throughDate).toLocaleDateString('en-US', {timeZone: 'UTC'}) : 'None';
    const disabled  = this.isLTEtoCharLimit()(eventText.length) && this.hasTypes()(types.length)
                    ? ''
                    : 'disabled';
    const displayTypes  = editable
                        ? <EventCheckboxes liftInput={this.liftInput} types={types} />
                        : types.map((type, i) => <p key={i}>{type}</p>);
    const displayStartDate  = editable
                            ? <input
                                name='startDate'
                                onChange={this.handleChange}
                                type='date'
                                value={defaultStartDate}
                              />
                            : <p>Start Date: {formattedStartDate}</p>;
    const displayThroughDate  = editable
                              ? <input
                                  name='throughDate'
                                  onChange={this.handleChange}
                                  type='date'
                                  value={defaultThroughDate}
                                />
                              : <p>Through Date: {formattedThroughDate}</p>;
    const clearThroughDateButton  = editable
                                  ? <button
                                      onClick={() => this.setState({ throughDate: '' })}
                                    >Clear Through Date</button>
                                  : '';
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
          <p>Likes: {likes || 'none'}</p>
          {displayTypes}
          {displayStartDate}
          {displayThroughDate}
          {clearThroughDateButton}
        </div>
        <EventTwoButtons
          cancelOnClick={this.cancelChange}
          disabled={disabled}
          deleteOnClick={() => deleteEvent(_id)}
          doneOnClick={() => this.handleEditEvent({eventText, _id, startDate, types, url: eventUrl, throughDate})}
          editOnClick={this.toggleEdit}
          useFirstState={!editable}
        />
      </div>
    );
  }
}
