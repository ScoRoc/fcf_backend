import React from 'react';
import axios from 'axios';

export default class NewManagerForm extends React.Component {

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
      <form className='new-manager-form' onSubmit={this.handleSubmit}>
        <h3>Enter New Manager Info</h3>
        <label htmlFor='new-manager-first-name'>First Name
          <br />
          <input id='new-manager-first-name' type='text' ref={ input => {this.firstName = input}} required />
        </label>
        <label htmlFor='new-manager-last-name'>Last Name
          <br />
          <input id='new-manager-last-name' type='text' ref={ input => {this.lastName = input}} required />
        </label>
        <label htmlFor='new-manager-email'>Email
          <br />
          <input id='new-manager-email' type='email' ref={ input => {this.email = input}} required />
        </label>
        <label htmlFor='new-manager-password'>Password
          <br />
          <input id='new-manager-password' type='text' ref={ input => {this.password = input}} required />
        </label>
        <button type='submit'>Add Manager</button>
      </form>
    );
  }
}
