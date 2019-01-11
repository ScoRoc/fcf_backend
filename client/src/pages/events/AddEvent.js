import React from 'react';
import axios from 'axios';

import CheckboxWrapper from '../../components/CheckboxWrapper';
import TextAreaCharCount from '../../components/TextAreaCharCount';

import { isLessThanOrEqual } from '../../utils/comparisons';
import { addItemToStateArr, removeItemFromStateArr } from '../../utils/helpers';
import useAxios from '../../utils/axios-helpers';
import checkboxes from './event-types';

const path = '/events';
const { postWithAxios } = useAxios(path);

const { allCheckboxes } = checkboxes();

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.startDate = React.createRef();
    this.throughDate = React.createRef();
    this.url = React.createRef();
    this.state = {
      allowTypingPastLimit: false,
      eventText: '',
      charCount: 0,
      charLimit: 25,
      types: [],
    }
  }

  isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    this.props.addEvent(data.event);
  }

  liftEventText = eventText => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? { charCount: eventText.length, eventText: eventText }
                      : this.isTextLTEtoLimit()(eventText.length)
                        ? { charCount: eventText.length, eventText: eventText }
                        : { charCount: eventText.length - 1 };
      return newState;
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

  handleSubmit = e => {
    e.preventDefault();
    const { eventText, types } = this.state;
    // MAKE SURE TYPES HAS SOME TYPE ON IT
    const startDate = this.startDate.current.value;
    const throughDate = this.throughDate.current.value;
    const url = this.url.current.value;
    postWithAxios({ eventText, startDate, throughDate, types, url }).then(result => {
      const { data } = result;
      data.errors ? this.handleErrors(data) : this.handleSuccess(data);
      this.setState({ eventText: '' });
    });
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit } = props;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charLimit: charLimit || 50,
      };
    });
  }

  render() {
    const { allowTypingPastLimit, eventText, charLimit } = this.state;
    const disabled = this.isTextLTEtoLimit()(eventText.length) ? '' : 'disabled';
    const inputs = Object.entries(allCheckboxes).map((entry, i) => {
      const [ key, value ] = entry;
      return  <CheckboxWrapper
                inputId={`new-event-type--${value.type}`}
                inputName='type'
                key={i}
                liftInput={this.liftInput}
                name={value.name}
                value={value.type}
                wrapperClassName={`AddEvent__form__type-wrap__${value.type}`}
              />

    });
    return (
      <section className='AddEvent'>
        <form encType="multipart/form-data" className='AddEvent__form' onSubmit={this.handleSubmit}>
          <div className='AddEvent__form__event-wrap'>
            <label htmlFor='new-event-text'>Event</label>
              <TextAreaCharCount
                allowTypingPastLimit={allowTypingPastLimit}
                charLimit={charLimit}
                id='new-event-text'
                liftText={this.liftEventText}
                divClass='AddEvent__form__tacc-wrap-div'
                pClass='AddEvent__form__tacc-wrap-div__p'
                textareaClass='AddEvent__form__tacc-wrap-div__textarea'
                required
                text={eventText}
              />
            </div>
            <div className='AddEvent__form__url-wrap'>
              <label htmlFor='new-event-url'>URL</label>
              <input
                id='new-event-url'
                ref={this.url}
                type='text'
              />
            </div>
            <div className='AddEvent__form__type-wrap'>
              {inputs}
            </div>
            <div className='AddEvent__form__start-date-wrap'>
              <label htmlFor='new-event-start-date'>Start Date</label>
              <input id='new-event-start-date' ref={this.startDate} type='date' />
            </div>
            <div className='AddEvent__form__through-date-wrap'>
              <label htmlFor='new-event-through-date'>Through Date</label>
              <input id='new-event-through-date' ref={this.throughDate} type='date' />
            </div>
          <button className={disabled} disabled={disabled} type='submit'>Add Announcement</button>
        </form>
      </section>
    );
  }
}
