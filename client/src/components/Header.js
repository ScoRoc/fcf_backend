import React from 'react';

import './components.min.css';
import Nav from './Nav';

const Header = props => {
  const navArea = props.manager ? <Nav logout={props.logout} manager={props.manager} /> : '';
  return (
    <header>
      <h2>FCF Management Portal</h2>
      {navArea}
    </header>
  );
}

export default Header;
