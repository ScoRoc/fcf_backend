// Libraries
import React, { useCallback, useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDropzone } from 'react-dropzone';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Span, Text, TextArea } from 'atoms';
// Organisms
import ImgCrop from 'organisms/ImgCrop';

// AnnouncementModal

const AnnouncementModal = ({ announcement, onCancel, onSave }) => {
  // State

  const [description, setDescription] = useState(announcement ? announcement.description : '');
  const [img, setImg] = useState(announcement ? announcement.img : null);
  const [url, setUrl] = useState(announcement ? announcement.url : '');

  // Refs

  const inputRef = useRef(null);

  // Dropzone

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        console.log('calling reader.onload');
        setImg(reader.result);
        reader.readAsDataURL(file);
      };
      reader.readAsArrayBuffer(file);
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
        <Box className='img-container' height='200px' styledFlex='default space-between'>
          <Box
            {...getRootProps({
              style: {
                alignItems: 'center',
                border: '2px dashed orange',
                borderRadius: '4px',
                className: 'img-dropzone',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                marginRight: '5px',
                outline: 'none',
              },
            })}
          >
            <Box backgroundColor='aqua' height='40px' width='40px' />
            <Text>Drop files to upload</Text>
            <Box>
              or{' '}
              <Span cursor='pointer' display='inline'>
                {'>>browse<<'}
              </Span>
            </Box>

            <input
              // onChange={e => setImg(e.target.value)}
              // onClearIconClick={handleClearIconClick}
              // placeholder='announcement-image-input'
              // value={img}
              {...getInputProps({
                multiple: false,
              })}
            />
          </Box>

          <ImgCrop img={img} />
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
