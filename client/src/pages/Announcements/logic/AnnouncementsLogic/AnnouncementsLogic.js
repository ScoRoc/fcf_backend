// Libraries
import React, { useDispatch, useEffect, useGlobal } from 'reactn';
import axios from 'axios';
// Announcements Templates
import AnnouncementsTemplate from '../../templates';
// Announcement Constants
// Announcement API Helpers
import { buildPatch } from './apiHelpers';
// Constants
import { PATHS, QUERY_STRING } from 'utils/constants';

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
    });
    return true;
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
      });
    return true;
  };

  const patchAnnouncement = async ({
    _id,
    crop,
    description,
    dimensions,
    imgFile,
    originalAnnouncement,
    url,
  }) => {
    console.log('in patch');

    if (!description || !url) {
      console.log('description, imgFile, and url need to be filled out');
      return false;
    }

    if (!crop || crop.height <= 0 || crop.width <= 0) {
      console.log('crop must exist and have a height and width larger than 0');
      return false;
    }

    const { config, data } = buildPatch({
      crop,
      description,
      dimensions,
      imgFile,
      originalAnnouncement,
      url,
      userId: user._id,
    });

    const patchUrl = `${baseUrl}/${_id}`;

    console.log('patchUrl: ', patchUrl);
    console.log('data: ', data);
    console.log('config: ', config);

    // setIsLoading(true);
    await axios.patch(patchUrl, data, config).then(res => {
      console.log('res: ', res);
      // setIsLoading(false);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      setAnnouncement({ announcement: res.data.announcement });
      // TODO Fix return to be based off if error or not
    });
    return true;
  };

  const postAnnouncement = async ({ crop, description, dimensions, imgFile, url }) => {
    console.log('in post');
    // TODO handle error validation
    // if (!date) throw new Error();
    if (!description || !dimensions || !imgFile || !url) {
      console.log('description, dimensions, imgFile, and url need to be filled out');
      return false;
    }

    if (!crop || crop.height <= 0 || crop.width <= 0) {
      console.log('crop must exist and have a height and width larger than 0');
      return false;
    }

    const formData = new FormData();
    formData.set('cropHeight', crop.height);
    formData.set('cropWidth', crop.width);
    formData.set('cropX', crop.x);
    formData.set('cropY', crop.y);
    formData.set('description', description);
    formData.append('imgFile', imgFile);
    formData.set('imgHeight', dimensions.height);
    formData.set('imgWidth', dimensions.width);
    formData.set('url', url);

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const qs = `?${QUERY_STRING.CREATED_BY_USER_ID.PARAM.value}=${user._id}`;
    const postUrl = `${baseUrl}${qs}`;
    // setIsLoading(true);
    await axios.post(postUrl, formData, config).then(res => {
      console.log('res: ', res);
      // res.status === 200 ? handleSuccess(res) : handleErrors(res);
      // setIsLoading(false);
      setAnnouncement({ announcement: res.data.announcement });
      // TODO Fix return to be based off if error or not
    });
    return true;
  };

  // Functions

  const handleSaveAnnouncement = async ({
    _id,
    crop,
    description,
    dimensions,
    imgFile,
    originalAnnouncement,
    url,
  }) => {
    const success = _id
      ? await patchAnnouncement({
          _id,
          crop,
          description,
          dimensions,
          imgFile,
          originalAnnouncement,
          url,
        })
      : await postAnnouncement({ crop, description, dimensions, imgFile, url });
    console.log('success: ', success);
    if (success) {
      // console.log('in handleSaveAnnouncement if success...');
    }
    return success;
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
      saveAnnouncement={handleSaveAnnouncement}
      // patchAnnouncement={patchAnnouncement}
      // postAnnouncement={postAnnouncement}

      // announcements={sortedWods}
      announcements={Object.values(announcements.data)}
    />
  );
};

export default AnnouncementsLogic;
