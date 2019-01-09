import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/actions';

import './SignIn.min.css';

class SignInPage extends React.Component {

  handleErrors = data => {
    console.log('data: ', data);
    console.log('err: ', data._message)
  }

  handleSuccess = data => {
    console.log('success: ', data);
    const { manager, token } = data;
    // localStorage.setItem('fcf_backend', data.token);
    // this.props.liftManager(data);
    this.props.login(manager, token);
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

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (manager, token) => dispatch(login(manager, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
