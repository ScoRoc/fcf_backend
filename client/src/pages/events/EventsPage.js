import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const EventsPage = props => {
  if (!props.manager) return <Redirect to='/signin' />;
  return (
    <p>events</p>
  );
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
  };
};

export default connect(mapStateToProps)(EventsPage);
