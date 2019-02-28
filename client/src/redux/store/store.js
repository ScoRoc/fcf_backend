import { combineReducers, createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import auth from '../modules/auth';
import pages from '../modules/pages';
import displayedUser from '../modules/displayed-user';
import displayedManager from '../modules/displayed-manager';

// const reducers = {
//   auth,
//   pages,
// };

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedReducer = persistCombineReducers(persistConfig, reducers);


// export default () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return { store, persistor }
// }

const rootReducer = combineReducers({
  auth,
  pages,
  displayedUser,
  displayedManager,
});

const store = createStore(rootReducer);

export default store;
