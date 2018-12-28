import React from 'react';
import axios from 'axios';

export default class AddAnnouncement extends React.Component {

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
    const announcement = this.announcement.value;
    const password = this.password.value;
    axios.post('/manager/signin', { announcement, password }).then(result => {
      const { data } = result;
      data.errors ? this.handleErrors(data) : this.handleSuccess(data);
    });
  }

  render() {
    return (
      <section className='AddAnnouncementPage'>
        <div className='AddAnnouncement'>
          <h3>Add an Announcement</h3>
          <form className='add-announcement-form' onSubmit={this.handleSubmit}>
            <label htmlFor='new-manager-email'>Announcement
              <br />
              <input id='new-manager-email' type='email' ref={ input => {this.announcement = input}} required />
            </label>
            <button type='submit'>Add</button>
          </form>
        </div>
      </section>
    );
  }
}
