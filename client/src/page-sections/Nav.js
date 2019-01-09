import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { logout } from '../redux/actions/actions';
import { logout } from '../redux/modules/auth';
import { setPage } from '../redux/modules/pages';

import './page-sections.min.css';

const Nav = props => {
  const superUser = props.manager ? props.manager.superUser : false;
  const addManager  = superUser
                    ? <NavLink to='/addmanager' onClick={() => props.setPage('/addmanager')}  activeClassName='selected-nav-link'>
                        <span id='add-manager-span-wrapper'><span>Add </span><span>Manager</span></span>
                      </NavLink>
                    : '';
  const handleLogoutClick = () => {
    props.setPage('/signin');
    props.logout();
  }
  return (
    <nav>
      <NavLink to='/home' onClick={() => props.setPage('/home')} activeClassName='selected-nav-link'>Home</NavLink>
      <NavLink to='/announcements' onClick={() => props.setPage('/announcements')} activeClassName='selected-nav-link'>Announcements</NavLink>
      <NavLink to='/events' onClick={() => props.setPage('/events')} activeClassName='selected-nav-link'>Events</NavLink>
      <NavLink to='/wod' onClick={() => props.setPage('/wod')} activeClassName='selected-nav-link'>Wod</NavLink>
      {addManager}
      {/* <NavLink to='/signin' onClick={handleLogoutClick} activeClassName='selected-nav-link'>Logout</NavLink> */}
      <NavLink to='/signin' onClick={handleLogoutClick}>Logout</NavLink>
    </nav>
  );
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
    page: state.pages.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    setPage: page => dispatch(setPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
