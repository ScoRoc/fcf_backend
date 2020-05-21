// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

const usersReducers = {
  removeUserInUsers: async (globalState, dispatch, _id) => {
    const cachedUsers = globalState.cache.users;
    delete cachedUsers.data[_id];
    await dispatch.setCache({ data: cachedUsers, key: 'users' });

    const { users } = globalState;
    delete users.data[_id];
    return { users };
  },
  setUserInUsers: async (
    globalState,
    dispatch,
    { direction = QUERY_STRING.DIRECTION.DESC.value, user },
  ) => {
    console.log('user in setUserInUsers: ', user);
    await dispatch.setCache({
      data: { ...globalState.users, data: { ...globalState.users.data, [user._id]: user } },
      key: 'users',
    });
    return {
      users: {
        data: { ...globalState.users.data, [user._id]: user },
        // direction,
        // direction === QUERY_STRING.DIRECTION.DESC.value
        //   ? [users, ...globalState.users.data]
        //   : [...globalState.users.data, users],
      },
    };
  },
  setUsers: async (
    globalState,
    dispatch,
    { data, direction = QUERY_STRING.DIRECTION.DESC.value },
  ) => {
    const userData = data.reduce((users, user) => {
      users[user._id] = user;
      return users;
    }, {});
    const newUsersState = {
      ...globalState.users,
      data: userData,
      // direction: direction || globalState.users.direction,
    };
    await dispatch.setCache({ data: newUsersState, key: 'users' });
    return { users: newUsersState };
  },
};

export default usersReducers;
