import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import AddWodWeek from './AddWodWeek';
import WodStrip from './WodStrip';

import { getIndex } from '../../utils/helpers';
import useAxios from '../../utils/axios-helpers';

const path = '/wodweek';
const { getWithAxios } = useAxios(path);

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

  // updateWod = ({ date, _id, text }) => {
  //   putWithAxios({ date, _id, text }).then(result => {
  //     console.log('result.data: ', result.data);
  //     const { updatedWod } = result.data;
  //     const wods = this.state.wods.slice(0);
  //     const thisWod = wods[ getIndex('_id', wods, _id) ];
  //     thisWod.date = date;
  //     thisWod.text = text;
  //     this.setState({ wods });
  //   });
  // }

  addWodWeek = wodweek => {
    //
  }

  componentDidMount() {
    if (this.props.manager) {
      getWithAxios().then(result => {
        const { wodWeeks } = result.data;
        console.log('#### wodWeeks ####: ', wodWeeks);
        this.setState({ wodWeeks });
      });
    }
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    const { wods, wodWeeks } = this.state;
    const weeks = wodWeeks.map((wodweek, i) => (
        <WodStrip allowTypingPastLimit={true} charLimit={50} key={i} wodweek={wodweek} />
      )
    );
    return (
      <section>
        <h1>WOD</h1>
        {/* CAP # OF LINES AT 16 */}
        <section>
          <AddWodWeek addWodWeek={this.addWodWeek} />
        </section>
        <section>
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
