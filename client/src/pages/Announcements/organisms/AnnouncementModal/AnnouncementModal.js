// Libraries
import React, { useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Text, TextArea } from 'atoms';
// Organisms
import Dropzone from 'organisms/Dropzone';
import ImgCropper from 'organisms/ImgCropper';
import LabeledInput from 'organisms/LabeledInput';
// Announcement Constants
import { IMAGES } from 'utils/constants';

// AnnouncementModal

const AnnouncementModal = ({ announcement, onCancel, onSave }) => {
  // State

  const [crop, setCrop] = useState(announcement?.image?.crop ?? null);
  const [dimensions, setDimensions] = useState(announcement?.image?.dimensions ?? null);
  const [description, setDescription] = useState(announcement?.description ?? '');
  const [imgFile, setImgFile] = useState(announcement?.imgFile || null);
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState(announcement?.image?.cloudinary?.url ?? null);
  const [url, setUrl] = useState(announcement?.url ?? '');

  // Refs

  const inputRef = useRef(null);

  // Functions

  const handleClearIconClick = e => {
    setUrl('');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
  };

  const handleLiftImg = ({ crop, dimensions }) => {
    setCrop(crop);
    setDimensions(dimensions);
  };

  const handleLoad = ({ event, reader }) => {
    setSrc(reader.result);
  };

  const handleSaveClick = async e => {
    setIsLoading(true);
    const result = await onSave({
      _id: announcement && announcement._id,
      crop,
      description,
      dimensions,
      imgFile,
      originalAnnouncement: announcement,
      url,
    });

    setIsLoading(false);
  };

  // TODO add spinner for waiting to add WOD

  const initialCrop = announcement && {
    aspect: IMAGES.ASPECT_RATIO,
    unit: announcement?.image?.crop && 'px',
    width: announcement?.image?.crop?.width,
    x: announcement?.image?.crop?.x,
    y: announcement?.image?.crop?.y,
  };

  // Return

  return (
    <Box padding='10px' styledFlex='center space-between column'>
      <Box padding='20px 50px' styledFlex='flex-start space-between column'>
        <Box
          className='announcement-modal-img-container'
          height='240px'
          marginBottom='10px'
          styledFlex='stretch space-between'
        >
          <Dropzone flex={1} marginRight='5px' onLoad={handleLoad} onNewFile={setImgFile} />

          <ImgCropper
            flex={1}
            imgContainerStyle={{ height: '236px' }}
            imgStyle={{ maxHeight: '236px' }}
            initialCrop={initialCrop}
            liftImg={handleLiftImg}
            marginLeft='5px'
            src={src}
            width='auto'
          />
        </Box>

        <LabeledInput label='Url'>
          <Input
            onChange={e => setUrl(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. http://www.foundationcrossfit.com/blog'
            ref={inputRef}
            value={url}
          />
        </LabeledInput>
        <LabeledInput label='Description'>
          <TextArea
            height='150px'
            marginBottom='10px'
            onChange={e => setDescription(e.target.value)}
            onClearButtonClick={() => setDescription('')}
            placeholder='Add Announcement description...'
            value={description}
          />
        </LabeledInput>
      </Box>

      {isLoading && <Text>Loading...</Text>}

      <Box height='auto' styledFlex='flex-end'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSaveClick}>Save</Button>
      </Box>
    </Box>
  );
};

AnnouncementModal.propTypes = {
  announcement: PropTypes.object,
  // announcement: PropTypes.shape({
  //   description: PropTypes.string,
  //   img: PropTypes.object,
  //   url: PropTypes.string,
  // }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

AnnouncementModal.defaultProps = {
  announcement: null,
  onCancel: null,
  onSave: null,
};

export default AnnouncementModal;
