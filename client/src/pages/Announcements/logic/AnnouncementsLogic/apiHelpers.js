// Announcement Constants
import { IMG_UPDATE } from '../../constants';
// Constants
import { API, PATHS, QUERY_STRING } from 'utils/constants';

export const buildPatch = ({
  crop,
  description,
  dimensions,
  imgFile,
  originalAnnouncement,
  url,
  userId,
}) => {
  const hasCropChanged = ({ newCrop, originalCrop }) =>
    newCrop.height !== originalCrop.height ||
    newCrop.width !== originalCrop.width ||
    newCrop.x !== originalCrop.x ||
    newCrop.y !== originalCrop.y;

  const buildFormPatch = ({ crop, description, dimensions, imgFile, transformation, url }) => {
    const formData = new FormData();
    formData.set('cropHeight', crop.height);
    formData.set('cropWidth', crop.width);
    formData.set('cropX', crop.x);
    formData.set('cropY', crop.y);
    formData.set('description', description);
    formData.append('imgFile', imgFile);
    formData.set('imgHeight', dimensions.height);
    formData.set('imgWidth', dimensions.width);
    formData.set('originalTransformation', transformation);
    formData.set('url', url);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { imgUpdate: IMG_UPDATE.NEW_IMG, [QUERY_STRING.UPDATED_BY_USER.PARAM.value]: userId },
    };

    return { config, data: formData };
  };

  const buildNewCropPatch = ({ crop, description, dimensions, transformation, url }) => {
    return {
      config: {
        params: { imgUpdate: IMG_UPDATE.CROP, [QUERY_STRING.UPDATED_BY_USER.PARAM.value]: userId },
      },
      data: {
        crop: {
          height: crop.height,
          width: crop.width,
          x: crop.x,
          y: crop.y,
        },
        description,
        dimensions: {
          height: dimensions.height,
          width: dimensions.width,
        },
        transformation,
        url,
      },
    };
  };

  const buildNoImgPatch = () => {
    return {
      config: {
        params: { imgUpdate: IMG_UPDATE.NONE, [QUERY_STRING.UPDATED_BY_USER.PARAM.value]: userId },
      },
      data: {
        description,
        url,
      },
    };
  };

  return imgFile
    ? buildFormPatch({
        crop,
        description,
        dimensions,
        imgFile,
        transformation: originalAnnouncement.image.cloudinary.transformation,
        url,
      })
    : hasCropChanged({ newCrop: crop, originalCrop: originalAnnouncement.image.crop })
    ? buildNewCropPatch({
        crop,
        description,
        dimensions,
        transformation: originalAnnouncement.image.cloudinary.transformation,
        url,
      })
    : buildNoImgPatch({ description, url });
};
