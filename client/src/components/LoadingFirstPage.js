import React from 'react';
import { Redirect } from 'react-router-dom';

const LoadingFirstPage = props => {
  const goTo = props.manager ? <Redirect to='/home' /> : <Redirect to='/signin' />;
  return (
    <>
      {goTo}
      <p>Loading...</p>
    </>
  );
}

export default LoadingFirstPage;
