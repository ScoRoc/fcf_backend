import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  return (
    <nav>
      <NavLink to='/home' activeClassName='selected-nav-link'>Home</NavLink>
      <NavLink to='/foo' activeClassName='selected-nav-link'>Foo</NavLink>
      <NavLink to='/signin' onClick={props.logout} activeClassName='selected-nav-link'>Logout</NavLink>
    </nav>
  );
}

export default Nav;
