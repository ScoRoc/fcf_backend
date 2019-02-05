import React from 'react';
import axios from 'axios';
import moment from 'moment';

import AddWodDay from './AddWodDay';

import { isLessThanOrEqual } from '../../utils/comparisons';
import useAxios from '../../utils/axios-helpers';

const path = '/wodweek';
const { postWithAxios } = useAxios(path);

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default class AddWodWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekOf: '',
      wods: [],
    }
  }

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    // this.props.addWodWeek(data.wodweek);
  }

  postWodWeek = wods => {
    postWithAxios({ wods }).then(result => {
        const { data } = result;
        data.errors ? this.handleErrors(data) : this.handleSuccess(data);
        // this.setState({ eventText: '' });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { wods } = this.state;
    wods.filter(wod => !wod.date._isValid).length > 0
      ? console.log('error, add a starting week')
      : this.postWodWeek(wods);
  }

  handleSetWeek = e => {
    const weekOf = moment(e.target.value);
    const wods = this.state.wods.slice(0);
    for (let wod of wods) {
      wod.date = moment(weekOf).add(wods.indexOf(wod), 'd');
    }
    this.setState({ weekOf, wods });
  }

  updateWod = (i, { date, text }) => {
    const newWods = [
      ...this.state.wods.slice(0, i),
      { date, text },
      ...this.state.wods.slice(i + 1),
    ];
    this.setState({ wods: newWods });
  }

  render() {
    const { weekOf } = this.state;
    const weekOfValue = weekOf._isValid ? new Date(weekOf._d).toISOString().substr(0, 10) : '';
    const addWodDays = daysOfWeek.map((day, i) => {
      return <AddWodDay
        allowTypingPastLimit={true}
        charLimit={50}
        date={ moment(weekOf).add(i, 'd') }
        day={day}
        i={i}
        key={i}
        updateWod={this.updateWod}
      />
    });
    return (
      <section className='AddWodWeek'>
        <p>Set week</p>
        <input name='week-of' onChange={this.handleSetWeek} type='date' value={weekOfValue} />
        <form encType="multipart/form-data" className='AddWodWeek__form' onSubmit={this.handleSubmit}>
          {addWodDays}
          <button onClick={this.handleSubmit} type='submit'>Add Wod Week</button>
        </form>
      </section>
    );
  }
}
