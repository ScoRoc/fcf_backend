import React from 'react';
import { NavLink } from 'react-router-dom';

import './components.min.css';

const SubNav = props => {
  const { component, page } = props;
  return (
    <nav className='subnav'>
      <NavLink to={{ pathname: `/${page}/add` }} activeClassName='selected-nav-link'>Add Announcement</NavLink>
    </nav>
  );
}

export default SubNav;
