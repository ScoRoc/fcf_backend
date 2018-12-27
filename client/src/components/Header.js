import React from 'react';

import Nav from './Nav';

const Header = props => {
  const navArea = props.manager ? <Nav logout={props.logout} /> : '';
  return (
    <header>
      <h2>FCF Management Portal</h2>
      {navArea}
    </header>
  );
}

export default Header;
