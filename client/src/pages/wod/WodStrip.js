import React from 'react';
import moment from 'moment';
import axios from 'axios';

import WodStripDay from './WodStripDay';

import { isEqual, isLessThanOrEqual } from '../../utils/comparisons';

export default class WodStrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekOf: '',
      wods: [],
    }
  }

  isEscapeKey = isEqual('Escape');
  isLTEtoCharLimit = () => isLessThanOrEqual(this.state.charLimit);

  // liftText = text => {
  //   this.setState((prevState, props) => {
  //     const { allowTypingPastLimit } = prevState;
  //     const newState  = allowTypingPastLimit
  //                     ? { charCount: text.length, text }
  //                     : this.isLTEtoCharLimit()(text.length)
  //                       ? { charCount: text.length, text }
  //                       : { charCount: text.length - 1 };
  //     return newState;
  //   });
  // }

  // clearText = () => {
  //   this.setState({ charCount: 0, text: '' });
  // }

  // cancelChange = () => {
  //   this.setState(prevState => {
  //     const { initialText } = prevState;
  //     return {
  //       charCount: initialText.length,
  //       date: '',
  //       editable: false,
  //       text: initialText,
  //     }
  //   });
  // }

  // handleKeyUp = e => {
  //   e.preventDefault();
  //   if ( this.isEscapeKey(e.key) ) this.cancelChange();
  // }

  // toggleEdit = () => {
  //   this.setState({ editable: !this.state.editable });
  // }

  // handleUpdateWod = ({ date, _id, text }) => {
  //   this.toggleEdit();
  //   this.props.updateWod({ date, _id, text });
  //   this.setState({ date, initialText: text, text });
  // }

  getFormattedWeekOf = date => {
    console.log('date: ', date)
    const mDate = moment(date);
    const day = mDate.format('dddd');
    const month = mDate.format('MMMM');
    const dateOfMonth = mDate.format('Do');
    return `${day}, ${month} ${dateOfMonth}`;
  }

  // componentDidUpdate(prevProps) {
  //   this.setState((prevState, props) => {
  //     if (prevState.date !== props.selectedDate && props.selectedDate._isValid) {
  //       return { date: props.selectedDate }
  //     }
  //   });
  // }

  componentDidMount() {
    this.setState((prevState, props) => {
      console.log('wodweek: ', this.props.wodweek);
      const { weekOf, wods } = props.wodweek;
      return { weekOf, wods }
    });
  }

  render() {
    const { weekOf, wods } = this.state;
    const formattedWeekOf = this.getFormattedWeekOf(weekOf);
    const days = wods.map((day, i) => <WodStripDay key={i} />);
    return (
      <div>
        <h4>Week of: {formattedWeekOf}</h4>
        {days}
      </div>
    );
  }
}
