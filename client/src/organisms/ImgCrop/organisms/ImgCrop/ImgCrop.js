// Libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// ImgCrop

const ImgCrop = ({ img, ...props }) => {
  // State

  const [crop, setCrop] = useState({
    aspect: 16 / 9,
    unit: '%',
    height: 50,
    width: 50,
    x: 25,
    y: 25,
  });

  // Effects

  useEffect(() => {
    console.log('in useEffect [img]: ', img);
  }, [img]);

  return (
    <Box border='2px dashed orchid' height='100%' width='50%'>
      {img && (
        <ReactCrop
          crop={crop}
          imageStyle={{ height: '200px' }}
          keepSelection={true}
          onChange={(crop, percentCrop) => {
            console.log('in onChange');
            setCrop(percentCrop);
          }}
          onComplete={(crop, percentCrop) => console.log('onComplete percentCrop: ', percentCrop)}
          // onImageLoaded={onLoad}
          ruleOfThirds
          src={img}
          style={{ height: '100%', width: '100%' }}
          {...props}
        />
      )}
    </Box>
  );
};

ImgCrop.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // img file type ??
};

ImgCrop.defaultProps = {
  img: null,
};

export default ImgCrop;
