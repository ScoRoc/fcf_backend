import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import useAxios from '../../utils/axios-helpers';

const path = '/user';
const { getWithAxios } = useAxios(path);

export default class DisplayedUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       displayedUser: {},
    }
  }

  componentDidMount() {
    this.setState({ displayedUser: this.props.displayedUser });
  }

  render() {
    return (
      <section>
        <Link to='/users'>Back</Link>
        <p>hey from displayed user page</p>
        <p>{this.state.displayedUser.firstName || 'no name yet'}</p>
      </section>
    );
  }
}
