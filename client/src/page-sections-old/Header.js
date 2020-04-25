import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './page-sections.min.css';
import Nav from './Nav';

const Header = props => {
  const navArea = props.manager
                ? <Nav location={props.location} />
                : '';
  return (
    <header>
      <h2><span>FCF </span><span id='long-mgmt'>Management </span><span id='short-mgmt'>Mgmt.</span><span>Portal</span></h2>
      {navArea}
    </header>
  );
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    token: state.auth.token,
  };
};

export default withRouter( connect(mapStateToProps)(Header) );
