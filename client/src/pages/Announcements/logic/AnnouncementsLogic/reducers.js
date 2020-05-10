// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

const announcementReducers = {
  removeAnnouncement: async (globalState, dispatch, _id) => {
    const cachedAnnouncements = globalState.cache.announcements;
    delete cachedAnnouncements.data[_id];
    await dispatch.setCache({ data: cachedAnnouncements, key: 'announcements' });

    const { announcements } = globalState;
    delete announcements.data[_id];
    return { announcements };
  },
  setAnnouncement: async (globalState, dispatch, { announcement }) => {
    console.log('announcement in setAnnouncement: ', announcement);
    return {
      announcements: {
        data: { ...globalState.announcements.data, [announcement._id]: announcement },
        // announcements:
        // direction === QUERY_STRING.DIRECTION.DESC.value
        //   ? [announcement, ...globalState.announcements.data]
        //   : [...globalState.announcements.data, announcement],
      },
    };
  },
  setAnnouncements: async (
    globalState,
    dispatch,
    { data, direction = QUERY_STRING.DIRECTION.DESC.value },
  ) => {
    const announcementData = data.reduce((announcements, announcement) => {
      announcements[announcement._id] = announcement;
      return announcements;
    }, {});
    const newAnnouncementsState = {
      ...globalState.announcements,
      data: announcementData,
      // direction: direction || globalState.announcements.direction,
    };
    await dispatch.setCache({ data: newAnnouncementsState, key: 'announcements' });
    return { announcements: newAnnouncementsState };
  },
};

export default announcementReducers;
