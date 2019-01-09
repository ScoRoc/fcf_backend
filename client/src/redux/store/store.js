import { combineReducers, createStore } from 'redux';
import auth from '../modules/auth';
import pages from '../modules/pages';

const rootReducer = combineReducers({
  auth,
  pages,
});

const store = createStore(rootReducer);

export default store;
