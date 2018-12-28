import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  const addManager  = props.manager.email === 'super@super.com'
                    ? <NavLink to='/addmanager' activeClassName='selected-nav-link'>Add Manager</NavLink>
                    : '';
  return (
    <nav>
      <NavLink to='/home' activeClassName='selected-nav-link'>Home</NavLink>
      <NavLink to='/announcements' activeClassName='selected-nav-link'>Announcements</NavLink>
      <NavLink to='/events' activeClassName='selected-nav-link'>Events</NavLink>
      <NavLink to='/wod' activeClassName='selected-nav-link'>Wod</NavLink>
      {addManager}
      <NavLink to='/signin' onClick={props.logout} activeClassName='selected-nav-link'>Logout</NavLink>
    </nav>
  );
}

export default Nav;
