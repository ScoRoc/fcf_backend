import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/actions';

import './page-sections.min.css';

const Nav = props => {
  console.log('props: ', props)
  const email = props.manager ? props.manager.email : '';
  const addManager  = email === 'super@super.com'
                    ? <NavLink to='/addmanager' activeClassName='selected-nav-link'>
                        <span id='add-manager-span-wrapper'><span>Add </span><span>Manager</span></span>
                      </NavLink>
                    : '';
  const foo = () => {
    console.log('foo')
  }
  return (
    <nav>
      <NavLink to='/home' onClick={foo} activeClassName='selected-nav-link'>Home</NavLink>
      <NavLink to='/announcements' activeClassName='selected-nav-link'>Announcements</NavLink>
      <NavLink to='/events' activeClassName='selected-nav-link'>Events</NavLink>
      <NavLink to='/wod' activeClassName='selected-nav-link'>Wod</NavLink>
      {addManager}
      <NavLink to='/signin' onClick={props.logout} activeClassName='selected-nav-link'>Logout</NavLink>
    </nav>
  );
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
