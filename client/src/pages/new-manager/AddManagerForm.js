import React from 'react';
import axios from 'axios';

import './AddManager.min.css';

export default class AddManagerForm extends React.Component {

  handleErrors = err => {
    console.log('err: ', err);
  }

  handleSuccess = data => {
    console.log('success: ', data);
    this.props.updateSuccessfulManager(data);
  }

  handleSubmit = e => {
    e.preventDefault();
    const email = this.email.value.toLowerCase();
    const firstName = this.firstName.value.toLowerCase();
    const lastName = this.lastName.value.toLowerCase();
    const password = this.password.value;
    axios.post('/manager/addmanager', { email, firstName, lastName, password }).then(result => {
      result.data.errors ? this.handleErrors(result.data._message) : this.handleSuccess(result.data);
      this.email.value = '';
      this.firstName.value = '';
      this.lastName.value = '';
      this.password.value = '';
    });
  }

  render() {
    return (
      <form className='add-manager-form' onSubmit={this.handleSubmit}>
        <h3>Enter New Manager Info</h3>
        <label htmlFor='add-manager-first-name'>First Name
          <br />
          <input id='add-manager-first-name' type='text' ref={ input => {this.firstName = input}} required />
        </label>
        <label htmlFor='add-manager-last-name'>Last Name
          <br />
          <input id='add-manager-last-name' type='text' ref={ input => {this.lastName = input}} required />
        </label>
        <label htmlFor='add-manager-email'>Email
          <br />
          <input id='add-manager-email' type='email' ref={ input => {this.email = input}} required />
        </label>
        <label htmlFor='add-manager-password'>Password
          <br />
          <input id='add-manager-password' type='text' ref={ input => {this.password = input}} required />
        </label>
        <button type='submit'>Add Manager</button>
      </form>
    );
  }
}
