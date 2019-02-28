import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import useAxios from '../../utils/axios-helpers';

const path = '/manager';
const { getWithAxios, putWithAxios } = useAxios(path);

export default class DisplayedManagerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       displayedManager: {},
    }
    this.newPassword = React.createRef();
  }

  // FIX FIX FIX
  handleClick = () => {
    const path = '/manager/password';
    const { putWithAxios } = useAxios(path);
    putWithAxios(
      { id: this.state.displayedManager._id, password: this.newPassword.current.value }
    ).then(result => {
      console.log('result.data: ', result.data);
      this.newPassword.current.value = '';
    });
  }

  componentDidMount() {
    this.setState({ displayedManager: this.props.displayedManager.manager });
  }

  render() {
    const firstName = this.state.displayedManager ? this.state.displayedManager.firstName : 'null';
    const lastName = this.state.displayedManager ? this.state.displayedManager.lastName : 'null';
    const email = this.state.displayedManager ? this.state.displayedManager.email : 'null';
    return (
      <section>
        <Link to='/managers'>Back</Link>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <div>
          <label>Change password:
            <input ref={this.newPassword} type='text' />
          </label>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </section>
    );
  }
}
