import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { liftUserToDisplay } from '../../redux/modules/displayed-user';

// PLACEHOLDER
const getWithAxios = console.log('useAxios placeholder...change with real func!!!');

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    };
  }

  handleClick = user => {
    this.props.liftUserToDisplay(user);
  };

  componentDidMount() {
    // getWithAxios().then(result => {
    //   this.setState({ allUsers: result.data.allUsers });
    // });
  }

  render() {
    const allUsers = this.state.allUsers.map(user => {
      return (
        <div key={user._id}>
          <Link to="/user" onClick={() => this.handleClick(user)}>
            {user.firstName} {user.lastName}
          </Link>
        </div>
      );
    });
    return (
      <section>
        <p>hey from users page</p>
        <h2>heres the users</h2>
        {allUsers}
      </section>
    );
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
