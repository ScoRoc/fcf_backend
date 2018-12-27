import React, { Component } from 'react';

import './NewManager.min.css';
import NewManagerForm from './NewManagerForm';

export default class NewManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // loggedIn: false
    }
  }

  render() {
    // if (this.state.loggedIn) return <Redirect to='/' />

    return (
      <div className='NewManager'>
        <h2>Add New Manager</h2>
        <div>
          <NewManagerForm />
        </div>
      </div>
    );
  }
}
