import React from 'react';
import { Redirect } from 'react-router-dom';
import './Home.min.css';

export default class Home extends React.Component {
  render() {
    const { manager } = this.props;
    // if (!manager) return <Redirect to='/signin' />;
    return (
      <div className='Home'>
        <p>home</p>
      </div>
    );
  }
}
