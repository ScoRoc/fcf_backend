import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Home.min.css';

import axios from 'axios';

class HomePage extends React.Component {

  byMonth = () => {
    axios.get('/events/bymonth').then(result => {
      // console.log('result data: ', result.data);
      console.log('result data eventsArr: ', result.data.eventsArr);
    });
  }

  render() {
    if (!this.props.manager) return <Redirect to='/signin' />;
    return (
      <div className='Home'>
        <p>home</p>
        <button onClick={this.byMonth}>get bymonth</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(HomePage);
