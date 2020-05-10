import React from 'react';
import axios from 'axios';
import moment from 'moment';

import TextAreaCharCount from '../../components/TextAreaCharCount';

import { isLessThanOrEqual } from '../../utils/comparisons';

export default class AddWodDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowTypingPastLimit: false,
      charLimit: 50,
      date: '',
      text: '',
    }
  }

  isTextLTEtoLimit = () => isLessThanOrEqual(this.state.charLimit);

  saveText = text => {
    this.props.updateWod(this.props.i, { date: this.state.date, text });
    return { charCount: text.length, text };
  }

  liftText = text => {
    this.setState((prevState, props) => {
      const { allowTypingPastLimit } = prevState;
      const newState  = allowTypingPastLimit
                      ? this.saveText(text)
                      : this.isTextLTEtoLimit()(text.length)
                        ? this.saveText(text)
                        : { charCount: text.length - 1 };
      return newState;
    });
  }

  formatMMDD = date => {
    const mDate = moment(date);
    const mm = mDate.format('MM');
    const dd = mDate.format('DD');
    return mDate._isValid ? `${mm}/${dd}` : '';
  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevProps.date._d !== this.props.date._d && this.props.date._d !== prevState.date._d ) {
      this.setState({ date: moment(this.props.date) });
    }
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
    const { allowTypingPastLimit, charLimit } = this.props;
    const { text } = this.state;
    const mmDD = this.formatMMDD(this.props.date._d);
    return (
      <div className='AddWodDay__form__event-wrap'>
        <label htmlFor='new-wod-day'>{this.props.day} {mmDD}</label>
          <TextAreaCharCount
            allowTypingPastLimit={allowTypingPastLimit}
            charLimit={charLimit}
            id='new-wodweek-text'
            liftText={this.liftText}
            divClass='AddWodDay__form__tacc-wrap-div'
            pClass='AddWodDay__form__tacc-wrap-div__p'
            textareaClass='AddWodDay__form__tacc-wrap-div__textarea'
            required
            text={text}
          />
        </div>
    );
  }
}
