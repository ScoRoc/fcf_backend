// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import axios from 'axios';
import moment from 'moment';
// Events Templates
import WodsTemplate from '../../templates';
// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

// URL Deets

// const baseUrl = `${API.PROD}${PATHS.EVENTS}`;
const baseUrl = PATHS.EVENTS;

// EventsLogic

const EventsLogic = () => {
  // Global

  const [events] = useGlobal('events');
  const [isLoading, setIsLoading] = useGlobal('isLoading');
  const [user] = useGlobal('user');

  // Dispatch

  const removeEvent = useDispatch('removeEvent');
  const setEvent = useDispatch('setEvent');
  const setEvents = useDispatch('setEvents');

  // Effects

  useEffect(() => {
    // getEvents().then(res => {
    //   console.log('res in EventsLogic: ', res);
    //   // res.status === 200 ? handleSuccess(res) : handleErrors(res);
    //   setIsLoading(false);
    //   setEvents(res.data.events);
    // });
    getEvents({ direction: 'desc' });
  }, []);

  // API Callbacks

  const deleteEvent = _id => {
    const url = `${baseUrl}/${_id}`;

    // setIsLoading(true);
    axios.delete(url).then(res => {
      console.log('res: ', res);
      // const updatedEvents = {};
      // setIsLoading(false);
      removeEvent(_id);
    });
  };

  // const getEvents = () => axios.get(baseUrl);
  const getEvents = () => {
    setIsLoading(true);
    // need to build queryString iterator
    return axios.get(baseUrl, {}).then(res => {
      console.log('res in EventsLogic: ', res);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      setIsLoading(false);
      setEvents({ data: res.data.events });
    });
  };

  const patchEvent = ({ _id, endDate, name, startDate, type, url }) => {
    console.log('in patch');

    const qs = `?${QUERY_STRING.UPDATED_BY_USER.PARAM.value}=${user._id}`;
    const patchUrl = `${baseUrl}/${_id}${qs}`;
    // setIsLoading(true);
    axios.patch(patchUrl, { endDate, name, startDate, type, url }).then(res => {
      console.log('res: ', res);
      // setIsLoading(false);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      setEvent({ event: res.data.event });
    });
  };

  const postEvent = ({ endDate, name, startDate, type, url }) => {
    console.log('in post');
    // TODO handle error validation
    // if (!date) throw new Error();
    if (!name || !startDate || !type || !url) {
      return void console.log('name, startDate, type, and url need to be filled out');
    }

    const qs = `?${QUERY_STRING.CREATED_BY_USER.PARAM.value}=${user._id}`;
    const postUrl = `${baseUrl}${qs}`;
    console.log('user: ', user);
    // setIsLoading(true);
    axios.post(postUrl, { endDate, name, startDate, type, url }).then(res => {
      console.log('res: ', res);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      // setIsLoading(false);
      setEvent({ event: res.data.event });
    });
  };

  // Sorted Events

  // TODO fix sorting
  // const sortedEvents = Object.values(events.data).sort((a, b) => {
  //   return events.direction === QUERY_STRING.DIRECTION.ASC
  //     ? moment(a.date).isBefore(moment(b.date))
  //       ? -1
  //       : 1
  //     : moment(a.date).isBefore(moment(b.date))
  //     ? 1
  //     : -1;
  // });

  // Return

  return (
    <WodsTemplate
      deleteEvent={deleteEvent}
      // events={sortedEvents}
      events={Object.values(events.data)}
      isLoading={isLoading}
      patchEvent={patchEvent}
      postEvent={postEvent}
    />
  );
};

export default EventsLogic;
