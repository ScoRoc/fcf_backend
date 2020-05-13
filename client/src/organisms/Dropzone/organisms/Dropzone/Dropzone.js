// Libraries
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Span, Text } from 'atoms';

const UploadIcon = <Box backgroundColor='aqua' height='40px' width='40px' />;

const DefaultText = ({ icon, ...props }) => {
  return (
    <Box height='auto' styledFlex='center center column' width='auto' {...props}>
      {icon || UploadIcon}
      <Text>Drop files to upload</Text>
      <Box>
        or <Span cursor='pointer'>{'>>browse<<'}</Span>
      </Box>
    </Box>
  );
};

// Dropzone

const Dropzone = ({ children, inputStyles, onAbort, onError, onLoad, onNewFile, ...props }) => {
  // Dropzone

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    onNewFile(file);

    const reader = new FileReader();
    reader.onabort = () => {
      // TODO delete comment as this is valid 2020 ecma
      // eslint-disable-next-line no-unused-expressions
      onAbort?.();
    };
    reader.onerror = () => {
      // TODO delete comment as this is valid 2020 ecma
      // eslint-disable-next-line no-unused-expressions
      onError?.();
    };
    reader.onload = event => {
      // TODO delete comment as this is valid 2020 ecma
      // eslint-disable-next-line no-unused-expressions
      onLoad?.({ event, reader });
    };

    reader.readAsDataURL(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps({
        style: {
          alignItems: 'center',
          border: '2px dashed orange',
          borderRadius: '4px',
          className: 'file-dropzone',
          // cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          outline: 'none',
        },
        ...props,
      })}
    >
      {children || <DefaultText />}
      <input
        {...getInputProps({
          multiple: false,
          ...inputStyles,
        })}
      />
    </Box>
  );
};

Dropzone.propTypes = {
  inputStyles: PropTypes.object,
  onAbort: PropTypes.func,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onNewFile: PropTypes.func,
};

Dropzone.defaultProps = {
  inputStyles: null,
  onAbort: null,
  onError: null,
  onLoad: null,
  onNewFile: null,
};

export default Dropzone;
