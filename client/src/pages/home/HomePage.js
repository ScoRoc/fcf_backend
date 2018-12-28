import React from 'react';
import { Redirect } from 'react-router-dom';
import './Home.min.css';

export default class HomePage extends React.Component {
  render() {
    const { manager } = this.props;
    return (
      <div className='Home'>
        <p>home</p>
      </div>
    );
  }
}
