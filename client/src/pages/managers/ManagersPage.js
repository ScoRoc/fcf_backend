import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { liftManagerToDisplay } from '../../redux/modules/displayed-manager';

import useAxios from '../../utils/axios-helpers';

const path = '/manager';
const { getWithAxios } = useAxios(path);

class ManagersPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       allManagers: [],
    }
  }

  handleClick = manager => {
    this.props.liftManagerToDisplay(manager);
  }

  componentDidMount() {
    getWithAxios().then(result => {
      // console.log('result.data: ', result.data);
      this.setState({ allManagers: result.data.allManagers });
    });
  }

  render() {
    const allManagers = this.state.allManagers.map(manager => {
      return (
        <div key={manager._id}>
          <Link
            to='/manager'
            onClick={() => this.handleClick(manager)}
          >{manager.firstName} {manager.lastName}</Link>
        </div>
      )
    });
    return (
      <section>
        <p>hey from users page</p>
        <Link to='/add-manager'>Add a manager</Link>
        <h2>heres the users</h2>
        {allManagers}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    displayedManager: state.displayedManager,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    liftManagerToDisplay: displayedManager => dispatch(liftManagerToDisplay(displayedManager)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagersPage);
