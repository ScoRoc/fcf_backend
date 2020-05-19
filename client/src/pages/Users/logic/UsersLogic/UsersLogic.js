// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import axios from 'axios';
import moment from 'moment';
// Users Templates
import UsersTemplate from '../../templates';
// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';
// URL Deets

// const baseUrl = `${API.PROD}${PATHS.USERS}`;
const baseUrl = PATHS.USERS;

// UsersLogic

const UsersLogic = () => {
  // Global

  const [isLoading, setIsLoading] = useGlobal('isLoading');
  const [user] = useGlobal('user');
  const [users] = useGlobal('users');

  // Dispatch

  const removeUserInUsers = useDispatch('removeUserInUsers');
  const setUserInUsers = useDispatch('setUserInUsers');
  const setUsers = useDispatch('setUsers');

  // Effects

  useEffect(() => {
    // getUsers().then(res => {
    //   console.log('res in UsersLogic: ', res);
    //   // res.status === 200 ? handleSuccess(res) : handleErrors(res);
    //   setIsLoading(false);
    //   setUsers(res.data.users);
    // });
    getUsers({ direction: 'desc' });
  }, []);

  // API Callbacks

  const deleteUser = async ({ _id }) => {
    //   const url = `${baseUrl}/${_id}`;

    //   // setIsLoading(true);
    //   axios.delete(url).then(res => {
    //     console.log('res: ', res);
    //     // const updateUsers = {};
    //     // setIsLoading(false);
    //     removeUserInUsers(_id);
    //   });
    return await new Promise(resolve => setTimeout(() => resolve(`id: ${_id}`), 1000));
  };

  // const getUsers = () => axios.get(baseUrl);
  const getUsers = async ({ direction = QUERY_STRING.DIRECTION.DESC.value } = {}) => {
    //   setIsLoading(true);
    //   // need to build queryString iterator

    try {
      const res = await axios.get(baseUrl, {
        params: {
          // [QUERY_STRING.DIRECTION.PARAM.value]: direction,
        },
      });

      console.log('res in UsersLogic: ', res);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      setIsLoading(false);
      setUsers({ data: res.data.users });
      return true;
    } catch (err) {
      console.error('err: ', err);
    }
  };

  // const patchUser = ({ _id, date, description, name }) => {
  //   console.log('in patch');

  //   const qs = `?${QUERY_STRING.UPDATED_BY_USER.PARAM.value}=${user._id}`;
  //   const url = `${baseUrl}/${_id}${qs}`;
  //   // setIsLoading(true);
  //   axios.patch(url, { date, description, name }).then(res => {
  //     console.log('res: ', res);
  //     // setIsLoading(false);
  //     // res.status === 200 ? handleSuccess(res) : handleErrors(res);
  //     setUserInUsers({ user: res.data.user });
  //   });
  // };

  const postUser = ({ firstName, email, password, lastName }) => {
    //   console.log('in post');
    //   // TODO handle error validation
    // if (!date) throw new Error();
    if (!firstName || !email || !password || !lastName) {
      return void console.log('firstName, email, password, and lastName need to be filled out');
    }

    const qs = `?${QUERY_STRING.CREATED_BY_USER.PARAM.value}=${user._id}`;
    const url = `${baseUrl}${qs}`;
    //   console.log('user: ', user);
    //   // setIsLoading(true);
    try {
      const res = axios.post(url, { firstName, email, password, lastName });
      //     console.log('res: ', res);
      //     // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      //     // setIsLoading(false);
      setUserInUsers({ user: res.data.user });
    } catch (err) {
      console.log('err: ', err);
    }
  };

  // Sorted Wods

  // TODO fix sorting
  // const sortedWods = Object.values(users.data).sort((a, b) => {
  //   return users.direction === QUERY_STRING.DIRECTION.ASC
  //     ? moment(a.date).isBefore(moment(b.date))
  //       ? -1
  //       : 1
  //     : moment(a.date).isBefore(moment(b.date))
  //     ? 1
  //     : -1;
  // });

  /////////////////////
  // FAKE USERS DATA //
  /////////////////////

  const fakeUsers = {
    data: {
      1: {
        _id: 1,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      2: {
        _id: 2,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      3: {
        _id: 3,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      4: {
        _id: 4,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      5: {
        _id: 5,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      6: {
        _id: 6,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      7: {
        _id: 7,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      8: {
        _id: 8,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
      9: {
        _id: 9,
        email: 'john@john.com',
        firstName: 'john',
        lastLogin: 'yesterday',
        lastName: 'smith',
        totalLikes: 42,
        totalViews: 42,
      },
    },
    10: {
      _id: 10,
      email: 'john@john.com',
      firstName: 'john',
      lastLogin: 'yesterday',
      lastName: 'smith',
      totalLikes: 42,
      totalViews: 42,
    },
    11: {
      _id: 11,
      email: 'john@john.com',
      firstName: 'john',
      lastLogin: 'yesterday',
      lastName: 'smith',
      totalLikes: 42,
      totalViews: 42,
    },
    12: {
      _id: 12,
      email: 'john@john.com',
      firstName: 'john',
      lastLogin: 'yesterday',
      lastName: 'smith',
      totalLikes: 42,
      totalViews: 42,
    },
    13: {
      _id: 13,
      email: 'john@john.com',
      firstName: 'john',
      lastLogin: 'yesterday',
      lastName: 'smith',
      totalLikes: 42,
      totalViews: 42,
    },
    14: {
      _id: 14,
      email: 'john@john.com',
      firstName: 'john',
      lastLogin: 'yesterday',
      lastName: 'smith',
      totalLikes: 42,
      totalViews: 42,
    },
    15: {
      _id: 15,
      email: 'john@john.com',
      firstName: 'john',
      lastLogin: 'yesterday',
      lastName: 'smith',
      totalLikes: 42,
      totalViews: 42,
    },
  };

  // Return

  return (
    <UsersTemplate
      deleteUser={deleteUser}
      //     isLoading={isLoading}
      //     patchUser={patchUser}
      //     postUser={postUser}
      users={users}
      // users={fakeUsers}
    />
  );
};

export default UsersLogic;
