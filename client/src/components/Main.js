import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import Home from '../pages/home/Home';
import SignIn from '../pages/signin/SignIn';

const Main = props => {
  const { history, liftManager, manager } = props;
  const goTo = manager ? <Redirect to='/home' /> : <Redirect to='/signin' />;
  return (
    <main className='main flex1'>
      {goTo}
      <Route path='/home' render={() => <Home manager={manager} />} />
      <Route path='/signin' render={() => <SignIn manager={manager} liftManager={liftManager} />} />
    </main>
  )
}

export default withRouter(Main);
