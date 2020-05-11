// Libraries
import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';

// ImgCropper

const ImgCropper = forwardRef(
  ({ imgBlob, initialCrop, imgContainerStyle, imgStyle, liftCrop, ...props }, ref) => {
    const [crop, setCrop] = useState(initialCrop);

    const handleChange = crop => {
      setCrop(crop);
      liftCrop(crop);
    };

    return (
      <Box
        border='2px dashed orchid'
        className='ImgCropper'
        ref={ref}
        styledFlex='center center'
        {...props}
      >
        <ReactCrop
          crop={crop}
          imageStyle={imgStyle}
          onChange={handleChange}
          ruleOfThirds
          src={imgBlob}
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            ...imgContainerStyle,
          }}
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
  liftCrop: PropTypes.func.isRequired,
};

ImgCropper.defaultProps = {
  imgBlob: null,
  imgContainerStyle: null,
  imgStyle: null,
  initialCrop: null,
  liftCrop: null,
};

export default ImgCropper;
