import React from 'react';
import moment from 'moment';
import axios from 'axios';

import WodStripDay from './WodStripDay';

import { isEqual, isLessThanOrEqual } from '../../utils/comparisons';
import useAxios from '../../utils/axios-helpers';

const path = '/wod';
const { putWithAxios } = useAxios(path);

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

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    const { updatedWod } = data;
    this.setState(prevState => {
      const idx = prevState.wods.indexOf( prevState.wods.find(wod => wod._id === updatedWod._id) );
      return { wods: prevState.wods.map((wod, i) => i === idx ? { ...wod, text: updatedWod.text } : wod) };
    });
  }

  updateWod = ({ _id, text }) => {
    putWithAxios({ _id, text }).then(result => {
      const { data } = result;
      data.errors ? this.handleErrors(data) : this.handleSuccess(data);
    });
  }

  getFormattedWeekOf = date => {
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
      // console.log('wodweek: ', this.props.wodweek);
      const { weekOf, wods } = props.wodweek;
      return { weekOf, wods }
    });
  }

  render() {
    const { weekOf, wods } = this.state;
    const { allowTypingPastLimit, charLimit, wodweek } = this.props;
    const wodIds = wods.map(wod => wod._id);
    const formattedWeekOf = this.getFormattedWeekOf(weekOf);
    const days = wods.map((wod, i) => (
      <WodStripDay
        allowTypingPastLimit={allowTypingPastLimit}
        charLimit={charLimit}
        wod={wod}
        key={i}
        updateWod={this.updateWod}
      />
    ));
    return (
      <div>
        <h4>Week of: {formattedWeekOf}</h4>
        <button onClick={() => this.props.deleteWodWeek(wodweek, wodIds)}>Delete whole week</button>
        {days}
      </div>
    );
  }
}
