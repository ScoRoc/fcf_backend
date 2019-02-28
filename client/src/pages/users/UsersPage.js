import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { liftUserToDisplay } from '../../redux/modules/displayed-user';

import useAxios from '../../utils/axios-helpers';

const path = '/user';
const { getWithAxios } = useAxios(path);

class UsersPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       allUsers: [],
    }
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
  }

  addNewUser = () => {
    const path = '/user/test-create';
    const { postWithAxios } = useAxios(path);
    postWithAxios({
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      email: this.email.current.value,
      password: this.password.current.value,
    }).then(result => {
      // console.log('result.data: ', result.data);
    });
  }

  handleClick = user => {
    this.props.liftUserToDisplay(user);
  }

  componentDidMount() {
    getWithAxios().then(result => {
      console.log('result.data: ', result.data);
      this.setState({ allUsers: result.data.allUsers });
    });
  }

  render() {
    const allUsers = this.state.allUsers.map(user => {
      return (
        <div key={user._id}>
          <Link
            to='/user'
            onClick={() => this.handleClick(user)}
          >{user.firstName} {user.lastName}</Link>
        </div>
      )
    });
    return (
      <section>
        {/* test */}
        <label>First Name
          <input ref={this.firstName} type='text' />
        </label>
        <label>Last Name
          <input ref={this.lastName} type='text' />
        </label>
        <label>Email
          <input ref={this.email} type='text' />
        </label>
        <label>Password
          <input ref={this.password} type='text' />
        </label>
        <button onClick={this.addNewUser}>add new user</button>
        {/* test */}
        <p>hey from users page</p>
        <h2>heres the users</h2>
        {allUsers}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    displayedUser: state.displayedUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    liftUserToDisplay: displayedUser => dispatch(liftUserToDisplay(displayedUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
