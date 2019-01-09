import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './AddManager.min.css';
import AddManagerForm from './AddManagerForm';
import SuccessfulNewManager from './SuccessfulNewManager';

class AddManagerPage extends Component {
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
    if (!this.props.manager) return <Redirect to='/signin' />;
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
      <div className='AddManager'>
        <h2>Add New Manager</h2>
        <div className='AddManager__body'>
          <AddManagerForm updateSuccessfulManager={this.updateSuccessfulManager} />
          {newManager}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
  };
};

export default connect(mapStateToProps)(AddManagerPage);
