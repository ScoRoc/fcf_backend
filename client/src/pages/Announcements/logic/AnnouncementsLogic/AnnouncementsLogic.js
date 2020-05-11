// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import axios from 'axios';
import moment from 'moment';
// Announcements Templates
import AnnouncementsTemplate from '../../templates';
// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

// URL Deets

// const baseUrl = `${API.PROD}${PATHS.ANNOUNCEMENTS}`;
const baseUrl = PATHS.ANNOUNCEMENTS;

// AnnouncementsLogic

const AnnouncementsLogic = () => {
  // Global

  const [announcements] = useGlobal('announcements');
  const [isLoading, setIsLoading] = useGlobal('isLoading');
  const [user] = useGlobal('user');

  // Dispatch

  const removeAnnouncement = useDispatch('removeAnnouncement');
  const setAnnouncement = useDispatch('setAnnouncement');
  const setAnnouncements = useDispatch('setAnnouncements');

  // Effects

  useEffect(() => {
    // getAnnouncements().then(res => {
    //   console.log('res in AnnouncementsLogic: ', res);
    //   // res.status === 200 ? handleSuccess(res) : handleErrors(res);
    //   setIsLoading(false);
    //   setAnnouncements(res.data.announcements);
    // });
    getAnnouncements({ direction: 'desc' });
  }, []);

  // API Callbacks

  const deleteAnnouncement = async _id => {
    const url = `${baseUrl}/${_id}`;

    // setIsLoading(true);
    await axios.delete(url).then(res => {
      console.log('res: ', res);
      // const updatedAnnouncements = {};
      // setIsLoading(false);
      removeAnnouncement(_id);
      // TODO Fix return to be based off if error or not
      return true;
    });
  };

  // const getAnnouncements = ({ direction = QUERY_STRING.DIRECTION.DESC.value } = {}) => {
  const getAnnouncements = async () => {
    setIsLoading(true);
    // need to build queryString iterator
    await axios
      .get(baseUrl, {
        // params: {
        //   [QUERY_STRING.DIRECTION.PARAM.value]: direction,
        // },
      })
      .then(res => {
        console.log('res in AnnouncementsLogic: ', res);
        // res.status === 200 ? handleSuccess(res) : handleErrors(res);
        setIsLoading(false);
        // setAnnouncements({ data: res.data.announcements, direction });
        setAnnouncements({ data: res.data.announcements });
        // TODO Fix return to be based off if error or not
        return true;
      });
  };

  const patchAnnouncement = async ({ _id, crop, description, imgFile, url }) => {
    console.log('in patch');

    if (!description || !imgFile || !url) {
      console.log('description, imgFile, and url need to be filled out');
      return false;
    }

    if (!crop || crop.height <= 0 || crop.width <= 0) {
      console.log('crop must exist and have a height and width larger than 0');
      return false;
    }

    const qs = `?${QUERY_STRING.UPDATED_BY_USER.PARAM.value}=${user._id}`;
    const patchUrl = `${baseUrl}/${_id}${qs}`;
    // setIsLoading(true);
    await axios.patch(patchUrl, { crop, description, imgFile, url }).then(res => {
      console.log('res: ', res);
      // setIsLoading(false);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      setAnnouncement({ announcement: res.data.announcement });
      // TODO Fix return to be based off if error or not
      return true;
    });
  };

  const postAnnouncement = async ({ crop, description, imgFile, url }) => {
    console.log('in post');
    // TODO handle error validation
    // if (!date) throw new Error();
    if (!description || !imgFile || !url) {
      console.log('description, imgFile, and url need to be filled out');
      return false;
    }

    if (!crop || crop.height <= 0 || crop.width <= 0) {
      console.log('crop must exist and have a height and width larger than 0');
      return false;
    }

    const qs = `?${QUERY_STRING.CREATED_BY_USER.PARAM.value}=${user._id}`;
    const postUrl = `${baseUrl}${qs}`;
    console.log('user: ', user);
    // setIsLoading(true);
    await axios.post(postUrl, { crop, description, imgFile, url }).then(res => {
      console.log('res: ', res);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      // setIsLoading(false);
      setAnnouncement({ announcement: res.data.announcement });
      // TODO Fix return to be based off if error or not
      return true;
    });
  };

  // Sorted Announcements

  // TODO fix sorting
  // const sortedWods = Object.values(announcements.data).sort((a, b) => {
  //   return announcements.direction === QUERY_STRING.DIRECTION.ASC
  //     ? moment(a.date).isBefore(moment(b.date))
  //       ? -1
  //       : 1
  //     : moment(a.date).isBefore(moment(b.date))
  //     ? 1
  //     : -1;
  // });

  // Return

  return (
    <AnnouncementsTemplate
      deleteAnnouncement={deleteAnnouncement}
      isLoading={isLoading}
      patchAnnouncement={patchAnnouncement}
      postAnnouncement={postAnnouncement}
      // announcements={sortedWods}
      announcements={Object.values(announcements.data)}
    />
  );
};

export default AnnouncementsLogic;
