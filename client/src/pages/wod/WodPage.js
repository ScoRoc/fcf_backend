import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const WodPage = props => {
  if (!props.manager) return <Redirect to='/signin' />;
  return (
    <p>wod</p>
  );
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
  };
};

export default connect(mapStateToProps)(WodPage);
