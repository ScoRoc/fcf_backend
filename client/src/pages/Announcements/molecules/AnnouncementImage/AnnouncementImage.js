// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Image, Text } from 'atoms';
import { IMAGES } from 'utils/constants';

// AnnouncementImage

const AnnouncementImage = ({ aspectRatio, height, src, width, ...props }) => {
  const dimensions = {
    height:
      height && width
        ? `${height / 2}px`
        : height
        ? `${height / 2}px`
        : `${parseInt(width / 2) / aspectRatio}px`,
    width:
      height && width
        ? `${width / 2}px`
        : width
        ? `${width / 2}px`
        : `${parseInt(height / 2) * aspectRatio}px`,
  };

  // Return

  return (
    <React.Fragment>
      {src ? (
        <Image height={dimensions.height} src={src} width={dimensions.width} {...props} />
      ) : (
        <Box
          backgroundColor='lightgrey'
          height={dimensions.height}
          styledFlex='center center'
          width={dimensions.width}
          {...props}
        >
          <Text>no image</Text>
        </Box>
      )}
    </React.Fragment>
  );
};

AnnouncementImage.propTypes = {
  aspectRatio: PropTypes.number,
  height: PropTypes.number, // valid height string
  src: PropTypes.string, // valid img url
  width: PropTypes.number, // valid width string
};

AnnouncementImage.defaultProps = {
  aspectRatio: IMAGES.ASPECT_RATIO,
  height: null,
  src: null,
  wdith: null,
};

export default AnnouncementImage;
