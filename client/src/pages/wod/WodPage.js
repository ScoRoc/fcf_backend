import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import WodStrip from './WodStrip';

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
      weekOf: '',
    }
  }

  handleSetWeek = date => {
    const weekOf = moment(date);
    this.setState({ weekOf });
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    const { weekOf } = this.state;
    console.log('weekOf: ', weekOf)
    const weekOfValue = weekOf ? new Date(weekOf).toISOString().substr(0, 10) : '';
    const days = daysOfWeek.map((day, i) => {
      return <WodStrip day={day} key={i} weekOf={weekOf} />
    });
    return (
      <section>
        <h1>WOD</h1>
        <p>Set week</p>
        <input name='week-of' onChange={this.handleSetWeek} type='date' value={weekOfValue} />
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
