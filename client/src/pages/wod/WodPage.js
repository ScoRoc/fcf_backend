import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import './Wod.min.css';
import AddWodWeek from './AddWodWeek';
import WodStrip from './WodStrip';

import { getIndex } from '../../utils/helpers';
import useAxios from '../../utils/axios-helpers';

const path = '/wodweek';
const { deleteWithAxios, getWithAxios } = useAxios(path);

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
      weekOf: '',
      wodWeeks: [],
    }
  }

  sortByDateDescending = arr => {
    return arr.sort((a, b) => {
      return a.weekOf === b.weekOf
                          ? 0
                          : a.weekOf < b.weekOf
                            ? 1
                            : -1;
    });
  }

  deleteWodWeek = (week, wodIds) => {
    const { _id } = week;
    deleteWithAxios({ _id, wodIds }).then(result => {
      // console.log('result.data: ', result.data);
      this.setState(prevState => {
        const wodWeeks = prevState.wodWeeks.slice(0);
        const filteredWodWeeks = wodWeeks.filter(wodweek => wodweek._id !== _id);
        return { wodWeeks: filteredWodWeeks };
      });
    });
  }

  addWodWeek = wodweek => {
    console.log('wodweek: ', wodweek);
    this.setState(prevState => {
      const withNewWeek = [ ...prevState.wodWeeks, wodweek ];
      console.log('withNewWeek: ', withNewWeek);
      const wodWeeks = withNewWeek.map(week => ({ ...week, weekOf: moment(week.weekOf) }) );
      return { wodWeeks: this.sortByDateDescending(wodWeeks) };
    });
  }

  componentDidMount() {
    if (this.props.manager) {
      getWithAxios().then(result => {
        const { wodWeeks } = result.data;
        this.setState({ wodWeeks });
      });
    }
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    const { wods, wodWeeks } = this.state;
    const weeks = wodWeeks.map(wodweek => (
        <WodStrip allowTypingPastLimit={true} charLimit={50} deleteWodWeek={this.deleteWodWeek} key={wodweek._id} wodweek={wodweek} />
      )
    );
    return (
      <section className='WodPage'>
        <h1>WOD</h1>
        {/* CAP # OF LINES AT 16 */}
        <AddWodWeek addWodWeek={this.addWodWeek} />
        <h3>Wod Weeks</h3>
        <section className='AllWodWeeks'>
          {weeks}
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
