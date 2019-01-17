import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import WodStrip from './WodStrip';

import { getIndex } from '../../utils/helpers';
import useAxios from '../../utils/axios-helpers';

const path = '/wod';
const { deleteWithAxios, getWithAxios, putWithAxios } = useAxios(path);

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

class WodPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialWeekOf: '',
      weekOf: '',
      wods: null,
    }
  }

  updateWod = ({ date, _id, text }) => {
    putWithAxios({ date, _id, text }).then(result => {
      console.log('result.data: ', result.data);
      const { updatedWod } = result.data;
      const wods = this.state.wods.slice(0);
      const thisWod = wods[ getIndex('_id', wods, _id) ];
      thisWod.date = date;
      thisWod.text = text;
      this.setState({ wods });
    });
  }

  handleSetWeek = e => {
    const weekOf = moment(e.target.value);
    this.setState({ weekOf });
  }

  componentDidMount() {
    if (this.props.manager) {
      getWithAxios().then(result => {
        const { wods } = result.data;
        const initialWeekOf = moment( wods[ getIndex('day', wods, 'Monday') ].date );
        this.setState({
          initialWeekOf,
          weekOf: initialWeekOf,
          wods,
        });
      });
    }
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    const { initialWeekOf, weekOf, wods } = this.state;
    const weekOfValue = weekOf._isValid ? new Date(weekOf._d).toISOString().substr(0, 10) : '';
    const days = wods
                ? daysOfWeek.map((day, i) => {
                  const date = moment(weekOf).add(i, 'days');
                  const wod = wods[ getIndex('day', wods, day) ];
                  return <WodStrip
                    day={day}
                    key={i}
                    selectedDate={date}
                    updateWod={this.updateWod}
                    wod={wod}
                  />
                })
                : '';
    return (
      <section>
        <h1>WOD</h1>
        <p>Set week</p>
        <input name='week-of' onChange={this.handleSetWeek} type='date' value={weekOfValue} />
        <button onClick={() => this.setState({ weekOf: initialWeekOf })}>Reset week</button>
        {/* CAP # OF LINES AT 16 */}
        <section>
          {days}
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
  };
};

export default connect(mapStateToProps)(WodPage);
