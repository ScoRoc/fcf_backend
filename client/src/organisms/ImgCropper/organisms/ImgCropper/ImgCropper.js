// Libraries
import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';
// Announcement Constants
import { IMAGES } from 'utils/constants';

// Default Crop

const defaultCrop = {
  aspect: IMAGES.ASPECT_RATIO,
  unit: '%',
  width: 50,
  x: 25,
  y: 25,
};

// ImgCropper

const ImgCropper = forwardRef(
  ({ initialCrop, imgContainerStyle, imgStyle, liftImg, src, ...props }, ref) => {
    const [crop, setCrop] = useState(initialCrop || defaultCrop);
    const [dimensions, setDimensions] = useState(null);

    const handleChange = crop => {
      setCrop(crop);
      liftImg({ crop, dimensions });
    };

    const handleImageLoaded = img => {
      setCrop(defaultCrop);
      setDimensions(img.getBoundingClientRect());
    };

    return (
      <Box
        border='2px dashed orchid'
        className='ImgCropper'
        ref={ref}
        styledFlex='stretch center'
        {...props}
      >
        <ReactCrop
          crop={crop}
          css={imgContainerStyle}
          imageStyle={imgStyle}
          onChange={handleChange}
          onImageLoaded={handleImageLoaded}
          ruleOfThirds
          src={src}
        />
      </Box>
    );
  },
);

ImgCropper.propTypes = {
  imgContainerStyle: PropTypes.object,
  imgStyle: PropTypes.object,
  initialCrop: PropTypes.object,
  liftImg: PropTypes.func.isRequired,
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // src file type ??
};

ImgCropper.defaultProps = {
  imgContainerStyle: null,
  imgStyle: null,
  initialCrop: null,
  liftImg: null,
  src: null,
};

export default ImgCropper;
