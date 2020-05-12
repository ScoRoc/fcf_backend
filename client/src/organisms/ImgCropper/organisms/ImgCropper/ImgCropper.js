// Libraries
import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// ImgCropper

const ImgCropper = forwardRef(
  ({ imgBlob, initialCrop, imgContainerStyle, imgStyle, liftImg, ...props }, ref) => {
    const [crop, setCrop] = useState(initialCrop);
    const [dimensions, setDimensions] = useState(null);

    const handleChange = crop => {
      setCrop(crop);
      liftImg({ crop, dimensions });
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
          onImageLoaded={img => setDimensions(img.getBoundingClientRect())}
          ruleOfThirds
          src={imgBlob}
        />
      </Box>
    );
  },
);

ImgCropper.propTypes = {
  imgBlob: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // imgBlob file type ??
  imgContainerStyle: PropTypes.object,
  imgStyle: PropTypes.object,
  initialCrop: PropTypes.object,
  liftImg: PropTypes.func.isRequired,
};

ImgCropper.defaultProps = {
  imgBlob: null,
  imgContainerStyle: null,
  imgStyle: null,
  initialCrop: null,
  liftImg: null,
};

export default ImgCropper;
