// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

const wodReducers = {
  removeWod: async (globalState, dispatch, _id) => {
    const cachedWods = globalState.cache.wods;
    delete cachedWods.data[_id];
    await dispatch.setCache({ data: cachedWods, key: 'wods' });

    const { wods } = globalState;
    delete wods.data[_id];
    return { wods };
  },
  setWod: async (globalState, dispatch, { direction = QUERY_STRING.DIRECTION.DESC.value, wod }) => {
    console.log('wod in setWod: ', wod);
    await dispatch.setCache({ data: { ...globalState.wods.data, [wod._id]: wod }, key: 'wods' });
    return {
      wods: {
        data: { ...globalState.wods.data, [wod._id]: wod },
        direction,
        // wods:
        // direction === QUERY_STRING.DIRECTION.DESC.value
        //   ? [wod, ...globalState.wods.data]
        //   : [...globalState.wods.data, wod],
      },
    };
  },
  setWods: async (
    globalState,
    dispatch,
    { data, direction = QUERY_STRING.DIRECTION.DESC.value },
  ) => {
    const wodData = data.reduce((wods, wod) => {
      wods[wod._id] = wod;
      return wods;
    }, {});
    const newWodsState = {
      ...globalState.wods,
      data: wodData,
      direction: direction || globalState.wods.direction,
    };
    await dispatch.setCache({ data: newWodsState, key: 'wods' });
    return { wods: newWodsState };
  },
};

export default wodReducers;
