// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// ImgCrop

const ImgCrop = ({ imgBlob, liftCrop, ...props }) => {
  const [crop, setCrop] = useState({
    aspect: 16 / 9,
    unit: '%',
    width: 50,
    x: 25,
    y: 25,
  });

  const handleChange = crop => {
    setCrop(crop);
    liftCrop(crop);
  };

  return (
    <Box border='2px dashed orchid' styledFlex='default center' width='50%'>
      <ReactCrop
        crop={crop}
        imageStyle={{ height: '200px' }}
        onChange={handleChange}
        ruleOfThirds
        src={imgBlob}
        style={{ height: '100%', margin: '0 auto', width: 'auto' }}
        {...props}
      />
    </Box>
  );
};

ImgCrop.propTypes = {
  imgBlob: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // imgBlob file type ??
  liftCrop: PropTypes.func.isRequired,
};

ImgCrop.defaultProps = {
  imgBlob: null,
  liftCrop: null,
};

export default ImgCrop;
