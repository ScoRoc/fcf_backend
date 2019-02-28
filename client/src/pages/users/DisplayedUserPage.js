import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import useAxios from '../../utils/axios-helpers';

const path = '/user';
const { getWithAxios, putWithAxios } = useAxios(path);

export default class DisplayedUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       displayedUser: {},
    }
    this.newPassword = React.createRef();
  }

  handleClick = () => {
    const path = '/user/password';
    const { putWithAxios } = useAxios(path);
    putWithAxios({ id: this.state.displayedUser._id, password: this.newPassword }).then(result => {
      console.log('result.data: ', result.data);
    });
  }

  componentDidMount() {
    this.setState({ displayedUser: this.props.displayedUser.user });
  }

  render() {
    const firstName = this.state.displayedUser ? this.state.displayedUser.firstName : 'null';
    const lastName = this.state.displayedUser ? this.state.displayedUser.lastName : 'null';
    const email = this.state.displayedUser ? this.state.displayedUser.email : 'null';
    return (
      <section>
        <Link to='/users'>Back</Link>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <p>Change password:</p>
        <div>
          <input ref={this.newPassword} type='text' />
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </section>
    );
  }
}
