import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// PLACEHOLDER
const getWithAxios = console.log('useAxios placeholder...change with real func!!!');
const putWithAxios = console.log('useAxios placeholder...change with real func!!!');

export default class DisplayedUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedUser: {},
    };
    this.newPassword = React.createRef();
  }

  handleClick = () => {
    putWithAxios({
      id: this.state.displayedUser._id,
      password: this.newPassword.current.value,
    }).then(result => {
      console.log('result.data: ', result.data);
      this.newPassword.current.value = '';
    });
  };

  componentDidMount() {
    this.setState({ displayedUser: this.props.displayedUser.user });
  }

  render() {
    const firstName = this.state.displayedUser ? this.state.displayedUser.firstName : 'null';
    const lastName = this.state.displayedUser ? this.state.displayedUser.lastName : 'null';
    const email = this.state.displayedUser ? this.state.displayedUser.email : 'null';
    const changePassword = this.props.superUser ? (
      <div>
        <label>
          Change password:
          <input ref={this.newPassword} type="text" />
        </label>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    ) : (
      ''
    );
    return (
      <section>
        <Link to="/users">Back</Link>
        <p>
          Name: {firstName} {lastName}
        </p>
        <p>Email: {email}</p>
        {changePassword}
      </section>
    );
  }
}
