import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import './components.min.css';
import HomePage from '../pages/home/HomePage';
import SignInPage from '../pages/signin/SignInPage';

const Main = props => {
  const { history, liftManager, manager } = props;
  // const goTo = manager ? <Redirect to='/home' /> : <Redirect to='/signin' />;
  return (
    <main className='main flex1'>
      {/* {goTo} */}
      <Route path='/home' render={() => <HomePage manager={manager} />} />
      <Route path='/signin' render={() => <SignInPage manager={manager} liftManager={liftManager} />} />
    </main>
  )
}

export default withRouter(Main);
