import React, { Component } from 'react';

import './NewManager.min.css';
import NewManagerForm from './NewManagerForm';
import SuccessfulNewManager from './SuccessfulNewManager';

export default class NewManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      successfulAdd: false,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }
  }

  clearManagerData = e => {
    this.setState({email: '', firstName: '', lastName: '', password: '', successfulAdd: false});
  }

  updateSuccessfulManager = ({manager, managerPassword}) => {
    const { email, firstName, lastName } = manager;
    this.setState({email, firstName, lastName, password: managerPassword, successfulAdd: true});
  }

  render() {
    const { email, firstName, lastName, password, successfulAdd } = this.state;
    const newManager  = successfulAdd
                      ? <SuccessfulNewManager
                          clearManagerData={this.clearManagerData}
                          email={email}
                          firstName={firstName}
                          lastName={lastName}
                          password={password}
                        />
                      : <div className='placeholder'>
                          <h3>Newly added manager...</h3>
                        </div>;
    return (
      <div className='NewManager'>
        <h2>Add New Manager</h2>
        <div className='NewManager__body'>
          <NewManagerForm updateSuccessfulManager={this.updateSuccessfulManager} />
          {newManager}
        </div>
      </div>
    );
  }
}
