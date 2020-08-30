// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import axios from 'axios';
import moment from 'moment';
// Wods Templates
import WodsTemplate from '../../templates';
// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

// URL Deets

// const baseUrl = `${API.PROD}${PATHS.WODS}`;
const baseUrl = PATHS.WODS;

// WodsLogic

const WodsLogic = () => {
  // Global

  const [isLoading, setIsLoading] = useGlobal('isLoading');
  const [user] = useGlobal('user');
  const [wods] = useGlobal('wods');

  // Dispatch

  const removeWod = useDispatch('removeWod');
  const setWod = useDispatch('setWod');
  const setWods = useDispatch('setWods');

  // Effects

  useEffect(() => {
    // getWods().then(res => {
    //   console.log('res in WodsLogic: ', res);
    //   // res.status === 200 ? handleSuccess(res) : handleErrors(res);
    //   setIsLoading(false);
    //   setWods(res.data.wods);
    // });
    getWods({ direction: 'desc' });
  }, []);

  // API Callbacks

  const deleteWod = _id => {
    const url = `${baseUrl}/${_id}`;

    // setIsLoading(true);
    axios.delete(url).then(res => {
      console.log('res: ', res);
      // const updatedWods = {};
      // setIsLoading(false);
      removeWod(_id);
    });
  };

  // const getWods = () => axios.get(baseUrl);
  const getWods = ({ direction = QUERY_STRING.DIRECTION.DESC.value } = {}) => {
    setIsLoading(true);
    // need to build queryString iterator
    return axios
      .get(baseUrl, {
        params: {
          [QUERY_STRING.DIRECTION.PARAM.value]: direction,
        },
      })
      .then(res => {
        console.log('res in WodsLogic: ', res);
        // res.status === 200 ? handleSuccess(res) : handleErrors(res);
        setIsLoading(false);
        setWods({ data: res.data.wods, direction });
      });
  };

  const patchWod = ({ _id, date, description, name }) => {
    console.log('in patch');

    const qs = `?${QUERY_STRING.UPDATED_BY_USER_ID.PARAM.value}=${user._id}`;
    const url = `${baseUrl}/${_id}${qs}`;
    // setIsLoading(true);
    axios.patch(url, { date, description, name }).then(res => {
      console.log('res: ', res);
      // setIsLoading(false);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      setWod({ wod: res.data.wod });
    });
  };

  const postWod = ({ date, description, name }) => {
    console.log('in post');
    // TODO handle error validation
    // if (!date) throw new Error();
    if (!date || !description || !name) {
      return void console.log('date, description, and name need to be filled out');
    }

    const qs = `?${QUERY_STRING.CREATED_BY_USER_ID.PARAM.value}=${user._id}`;
    const url = `${baseUrl}${qs}`;
    console.log('user: ', user);
    // setIsLoading(true);
    axios.post(url, { date, description, name }).then(res => {
      console.log('res: ', res);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      // setIsLoading(false);
      setWod({ wod: res.data.wod });
      // TODO handle errors
    });
  };

  // Sorted Wods

  // TODO fix sorting
  const sortedWods = Object.values(wods.data).sort((a, b) => {
    return wods.direction === QUERY_STRING.DIRECTION.ASC
      ? moment(a.date).isBefore(moment(b.date))
        ? -1
        : 1
      : moment(a.date).isBefore(moment(b.date))
      ? 1
      : -1;
  });

  // Return

  return (
    <WodsTemplate
      deleteWod={deleteWod}
      isLoading={isLoading}
      patchWod={patchWod}
      postWod={postWod}
      wods={sortedWods}
    />
  );
};

export default WodsLogic;
