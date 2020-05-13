// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

const eventReducers = {
  removeEvent: async (globalState, dispatch, _id) => {
    const cachedEvents = globalState.cache.events;
    delete cachedEvents.data[_id];
    await dispatch.setCache({ data: cachedEvents, key: 'events' });

    const { events } = globalState;
    delete events.data[_id];
    return { events };
  },
  setEvent: async (globalState, dispatch, { event }) => {
    console.log('event in setEvent: ', event);
    await dispatch.setCache({
      data: { ...globalState.events.data, [event._id]: event },
      key: 'events',
    });

    return {
      events: {
        data: { ...globalState.events.data, [event._id]: event },
      },
    };
  },
  setEvents: async (globalState, dispatch, { data }) => {
    const eventData = data.reduce((events, event) => {
      events[event._id] = event;
      return events;
    }, {});
    const newEventsState = {
      ...globalState.events,
      data: eventData,
    };
    await dispatch.setCache({ data: newEventsState, key: 'events' });
    return { events: newEventsState };
  },
};

export default eventReducers;
