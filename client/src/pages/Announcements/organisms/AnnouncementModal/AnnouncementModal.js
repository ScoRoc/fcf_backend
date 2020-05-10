// Libraries
import React, { useCallback, useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDropzone } from 'react-dropzone';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Text, TextArea } from 'atoms';

// AnnouncementModal

const AnnouncementModal = ({ announcement, onCancel, onSave }) => {
  // Refs

  const inputRef = useRef(null);

  // State

  const [description, setDescription] = useState(announcement ? announcement.description : '');
  const [img, setImg] = useState(announcement ? announcement.img : '');
  const [url, setUrl] = useState(announcement ? announcement.url : '');

  // Dropzone

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        console.log('here');
      };
      reader.readAsArrayBuffer(file);
      console.log('file: ', file);
    });
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  // Functions

  const handleClearIconClick = e => {
    setUrl('');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
  };

  // Return

  return (
    <Box padding='10px' styledFlex='center space-between column'>
      <Box padding='20px 50px' styledFlex='flex-start space-between column'>
        <Box
          {...getRootProps({
            style: {
              alignSelf: 'flexStart',
              backgroundColor: 'green',
              height: '100px',
              marginTop: '40px',
              width: '100%',
            },
          })}
        >
          <input
            // onChange={e => setImg(e.target.value)}
            // onClearIconClick={handleClearIconClick}
            // placeholder='announcement-image-input'
            // value={img}
            {...getInputProps()}
          />
        </Box>

        <Box marginBottom='20px' width='100%'>
          <Text marginBottom='30px'>Url</Text>
          <Input
            onChange={e => setUrl(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. http://www.foundationcrossfit.com/blog'
            ref={inputRef}
            value={url}
          />
        </Box>

        <Box width='100%'>
          <Text marginBottom='30px'>Description</Text>
          <TextArea
            marginBottom='40px'
            onChange={e => setDescription(e.target.value)}
            onClearButtonClick={() => setDescription('')}
            placeholder='Add Announcement description...'
            value={description}
          />
        </Box>
      </Box>

      <Box height='auto' styledFlex='flex-end'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={() => onSave({ _id: announcement && announcement._id, description, img, url })}
        >
          Save
        </Button>
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
