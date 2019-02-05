import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import AddWodWeek from './AddWodWeek';
import WodStrip from './WodStrip';

import { getIndex } from '../../utils/helpers';
import useAxios from '../../utils/axios-helpers';

const path = '/wod';
const { deleteWithAxios, getWithAxios, putWithAxios, postWithAxios } = useAxios(path);

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

class WodPage extends React.Component {
  constructor(props) {
    super(props);
    // this.text = React.createRef();
    // this.day = React.createRef();
    // this.date = React.createRef();
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

  addWodWeek = wodweek => {
    //
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

  // addWod = () => {
  //   postWithAxios({
  //     text: this.text.current.value,
  //     day: this.day.current.value,
  //     date: moment(this.date.current.value)._d,
  //   }).then(result => {
  //     console.log('result.data: ', result.data);
  //   });
  // }

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
        {/* CAP # OF LINES AT 16 */}
        <section>
          <AddWodWeek addWodWeek={this.addWodWeek} />
          {/* {days} */}
        </section>

        {/* <input ref={this.text} type='text' />text
        <input ref={this.day} type='text' />day
        <input ref={this.date} type='date' />date
        <button onClick={this.addWod}>add wod</button> */}

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
