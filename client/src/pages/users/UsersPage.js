import React from 'react';
import { Redirect } from 'react-router-dom';

import useAxios from '../../utils/axios-helpers';

const path = '/user';
const { getWithAxios } = useAxios(path);

export default class UsersPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       allUsers: [],
    }
  }

  componentDidMount() {
    getWithAxios().then(result => {
      this.setState({ allUsers: result.data.allUsers });
    });
  }

  render() {
    const allUsers = this.state.allUsers.map(user => <p>{user.firstName}</p>);
    return (
      <section>
        <p>hey from users page</p>
        <h2>heres the users</h2>
        {allUsers}
      </section>
    )
  }
}
