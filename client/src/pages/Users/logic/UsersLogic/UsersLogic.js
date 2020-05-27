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
    const url = `${baseUrl}/${_id}`;

    //   // setIsLoading(true);
    try {
      const res = await axios.delete(url);
      console.log('res: ', res);
      if (res) removeUserInUsers(_id);
      return res;
    } catch (err) {
      console.log('err: ', err);
    }
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

  const patchUser = async ({ _id, email, firstName, lastName, password, role }) => {
    //   console.log('in patch');

    const qs = `?${QUERY_STRING.UPDATED_BY_USER_ID.PARAM.value}=${user._id}`;
    const url = `${baseUrl}/${_id}${qs}`;
    //   // setIsLoading(true);
    try {
      const res = await axios.patch(url, { email, firstName, lastName, password, role });
      console.log('res: ', res);
      //     // setIsLoading(false);
      //     // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      setUserInUsers({ user: res.data.user });
      return res;
    } catch (err) {
      console.log('err: ', err);
      console.error(err);
    }
  };

  const postUser = async ({ email, firstName, lastName, password, role }) => {
    //   console.log('in post');
    //   // TODO handle error validation
    // if (!date) throw new Error();
    if (!firstName || !email || !password || !lastName || !role) {
      return void console.log(
        'firstName, email, password, lastName, and role need to be filled out',
      );
    }

    const qs = `?${QUERY_STRING.CREATED_BY_USER_ID.PARAM.value}=${user._id}`;
    const url = `${baseUrl}${qs}`;
    //   console.log('user: ', user);
    //   // setIsLoading(true);
    try {
      const res = await axios.post(url, { email, firstName, lastName, password, role });
      console.log('res: ', res);
      //     // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      //     // setIsLoading(false);
      setUserInUsers({ user: res.data.user });
      return res;
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

  // Return

  return (
    <UsersTemplate
      deleteUser={deleteUser}
      //     isLoading={isLoading}
      patchUser={patchUser}
      postUser={postUser}
      users={users}
    />
  );
};

export default UsersLogic;
