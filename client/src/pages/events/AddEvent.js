import React from 'react';
import axios from 'axios';
import moment from 'moment';

import EventRadioButtons from './EventRadioButtons';
import TextAreaCharCount from '../../components/TextAreaCharCount';

import { isLessThanOrEqual } from '../../utils/comparisons';
import checkboxes from './event-types';

// PLACEHOLDER
const postWithAxios = console.log('useAxios placeholder...change with real func!!!');

const { allCheckboxes } = checkboxes();

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.defaultType = 'community';
    this.startDate = React.createRef();
    this.throughDate = React.createRef();
    this.url = React.createRef();
    this.state = {
      allowTypingPastLimit: false,
      eventText: '',
      charCount: 0,
      charLimit: 25,
      type: this.defaultType,
    };
  }

  isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message);
  };

  handleSuccess = data => {
    console.log('success: ', data);
    console.log('');
    this.props.addEvent(data.event);
  };

  liftEventText = eventText => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState = allowTypingPastLimit
        ? { charCount: eventText.length, eventText: eventText }
        : this.isTextLTEtoLimit()(eventText.length)
        ? { charCount: eventText.length, eventText: eventText }
        : { charCount: eventText.length - 1 };
      return newState;
    });
  };

  updateType = e => {
    this.setState({ type: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { eventText, type } = this.state;
    // MAKE SURE TYPES HAS SOME TYPE ON IT
    const startDate = moment(this.startDate.current.value)._d;
    const throughDate = moment(this.throughDate.current.value)._d;
    const url = this.url.current.value;
    postWithAxios({ eventText, startDate, throughDate, type, url }).then(result => {
      const { data } = result;
      data.errors ? this.handleErrors(data) : this.handleSuccess(data);
      this.setState({ eventText: '' });
    });
  };

  componentDidMount() {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit, charLimit } = props;
      return {
        allowTypingPastLimit: false || allowTypingPastLimit,
        charLimit: charLimit || 25,
      };
    });
  }

  render() {
    const { allowTypingPastLimit, eventText, charLimit, type } = this.state;
    const disabled = this.isTextLTEtoLimit()(eventText.length) ? '' : 'disabled';
    return (
      <section className="AddEvent">
        <form encType="multipart/form-data" className="AddEvent__form" onSubmit={this.handleSubmit}>
          <div className="AddEvent__form__event-wrap">
            <label htmlFor="new-event-text">Event</label>
            <TextAreaCharCount
              allowTypingPastLimit={allowTypingPastLimit}
              charLimit={charLimit}
              id="new-event-text"
              liftText={this.liftEventText}
              divClass="AddEvent__form__tacc-wrap-div"
              pClass="AddEvent__form__tacc-wrap-div__p"
              textareaClass="AddEvent__form__tacc-wrap-div__textarea"
              required
              text={eventText}
            />
          </div>
          <div className="AddEvent__form__url-wrap">
            <label htmlFor="new-event-url">URL</label>
            <div id="new-event-url-wrapper">
              <span>http://</span>
              <input id="new-event-url" ref={this.url} type="text" />
            </div>
          </div>
          <div className="AddEvent__form__type-wrap">
            <EventRadioButtons handleOnChange={this.updateType} type={type} />
          </div>
          <div className="AddEvent__form__start-date-wrap">
            <label htmlFor="new-event-start-date">Start Date</label>
            <input id="new-event-start-date" ref={this.startDate} type="date" />
            <span>required</span>
          </div>
          <div className="AddEvent__form__through-date-wrap">
            <label htmlFor="new-event-through-date">Through Date</label>
            <input id="new-event-through-date" ref={this.throughDate} type="date" />
            <span>optional</span>
          </div>
          <button className={disabled} disabled={disabled} type="submit">
            Add Announcement
          </button>
        </form>
      </section>
    );
  }
}
