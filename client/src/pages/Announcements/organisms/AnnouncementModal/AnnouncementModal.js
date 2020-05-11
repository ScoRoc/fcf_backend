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

// AnnouncementModal

const AnnouncementModal = ({ announcement, onCancel, onSave }) => {
  // State

  const [crop, setCrop] = useState(null);
  const [description, setDescription] = useState(announcement ? announcement.description : '');
  const [imgBlob, setImgBlob] = useState(announcement ? announcement.imgBlob : null);
  const [imgFile, setImgFile] = useState(announcement ? announcement.imgFile : null);
  const [url, setUrl] = useState(announcement ? announcement.url : '');

  // Refs

  const inputRef = useRef(null);

  // Functions

  const handleClearIconClick = e => {
    setUrl('');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
  };

  const handleLoad = ({ event, reader }) => {
    setImgBlob(reader.result);
  };

  const handleSaveClick = e => {
    onSave({ _id: announcement && announcement._id, crop, description, imgBlob, imgFile, url });
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
            imgBlob={imgBlob}
            imgContainerStyle={{ height: '210px' }}
            imgStyle={{ height: '210px' }}
            initialCrop={{
              aspect: 16 / 9,
              unit: '%',
              width: 50,
              x: 25,
              y: 25,
            }}
            liftCrop={setCrop}
            marginLeft='5px'
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
