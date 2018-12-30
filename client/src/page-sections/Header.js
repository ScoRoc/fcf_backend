import React from 'react';

import './page-sections.min.css';
import Nav from './Nav';

const Header = props => {
  const navArea = props.manager ? <Nav logout={props.logout} manager={props.manager} /> : '';
  return (
    <header>
      <h2><span>FCF </span><span id='long-mgmt'>Management </span><span id='short-mgmt'>Mgmt.</span><span>Portal</span></h2>
      {navArea}
    </header>
  );
}

export default Header;
