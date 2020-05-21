// Constants
const { CLOUDINARY } = require('../../constants/cloudinary');

const buildCroppedUrl = ({ format, height, public_id, version, width, x, y }) => {
  const baseUrl = CLOUDINARY.BASE_URL;
  const cropString = `c_crop,h_${height},w_${width},x_${x},y_${y}`;
  return `${baseUrl}/${cropString}/v${version}/${public_id}.${format}`;
};

const buildImage = ({ crop, dimensions }) => {
  const _crop = {
    height: parseFloat(crop.height),
    width: parseFloat(crop.width),
    x: parseFloat(crop.x),
    y: parseFloat(crop.y),
  };

  const _dimensions = {
    height: parseFloat(dimensions.height),
    width: parseFloat(dimensions.width),
  };

  return {
    crop: {
      height: _crop.height,
      width: _crop.width,
      x: _crop.x,
      y: _crop.y,
      percent: {
        height: _crop.height / _dimensions.height,
        width: _crop.width / _dimensions.width,
        x: _crop.x / _dimensions.width,
        y: _crop.y / _dimensions.height,
      },
    },
    dimensions: {
      height: _dimensions.height,
      width: _dimensions.width,
    },
  };
};

module.exports = {
  buildCroppedUrl,
  buildImage,
};
