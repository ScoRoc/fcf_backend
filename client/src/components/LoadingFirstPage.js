import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const LoadingFirstPage = props => {
  // history.push('/addmanager')
  const goTo  = props.manager
              ? <Redirect to={props.page} />
              : <Redirect to='/signin' />;
  return (
    <>
      {goTo}
      <p>Loading...</p>
    </>
  );
}

const mapStateToProps = state => {
  return {
    manager: state.auth.manager,
    page: state.pages.page,
  };
};

export default withRouter( connect(mapStateToProps)(LoadingFirstPage) );
