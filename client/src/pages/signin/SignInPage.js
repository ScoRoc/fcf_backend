import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './SignIn.min.css';

export default class SignInPage extends React.Component {

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    localStorage.setItem('fcf_backend', data.token);
    this.props.liftManager(data);
  }

  handleSubmit = e => {
    e.preventDefault();
    const email = this.email.value.toLowerCase();
    const password = this.password.value;
    axios.post('/manager/signin', { email, password }).then(result => {
      const { data } = result;
      data.errors ? this.handleErrors(data) : this.handleSuccess(data);
    });
  }

  render() {
    if (this.props.manager) return <Redirect to='/home' />;
    return (
      <div className='SignIn'>
        <form className='signin-form' onSubmit={this.handleSubmit}>
          <h3>Please Sign In</h3>
          <label htmlFor='new-manager-email'>Email
            <br />
            <input id='new-manager-email' type='email' ref={ input => {this.email = input}} required />
          </label>
          <label htmlFor='new-manager-password'>Password
            <br />
            <input id='new-manager-password' type='password' ref={ input => {this.password = input}} required />
          </label>
          <button type='submit'>Sign In</button>
        </form>
      </div>
    );
  }
}
