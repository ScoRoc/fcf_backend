// Libraries
import React, { useEffect, useGlobal, useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
// Airbnb Cal
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION } from 'react-dates/constants';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Text, TextArea } from 'atoms';
// Hooks
import { usePrevious } from 'hooks';

// WodModal

const WodModal = ({ initialData, onCancel, onSave, setIsOpen }) => {
  // Global State

  const [isLoading] = useGlobal('isLoading');

  // Refs

  const inputRef = useRef(null);

  // State

  const [date, setDate] = useState(initialData?.date);
  const [description, setDescription] = useState(initialData?.description);
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState(initialData?.name);

  console.log('initialData: ', initialData);

  // usePrevious

  const prevIsLoading = usePrevious(isLoading);

  // Effects

  useEffect(() => {
    const clearText = e => {
      e.preventDefault();
      if (e.key === 'Escape' || (e.key === 'Backspace' && e.shiftKey)) {
        setName('');
      }
    };

    window.addEventListener('keyup', clearText);
    return () => window.removeEventListener('keyup', clearText);
  }, []);

  useEffect(() => {
    if (prevIsLoading && !isLoading) {
      setIsOpen(false);
    }
  }, [isLoading]);

  // Functions

  const handleCancel = e => {
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    onCancel?.(e);
    setIsOpen(false);
  };

  const handleClearIconClick = e => {
    setName('');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
  };

  const handleSave = () => {
    console.log('handle save');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    onSave?.({ date, description, name });
  };

  // Return

  return (
    <Box padding='10px' styledFlex='center space-between column'>
      <Box padding='20px 50px' styledFlex='flex-start space-between column'>
        <Box alignSelf='flex-start' marginTop='40px'>
          <SingleDatePicker
            date={date} // momentPropTypes.momentObj or null
            enableOutsideDays
            firstDayOfWeek={1}
            focused={focused}
            hideKeyboardShortcutsPanel
            id='add_wod_calendar' // PropTypes.string.isRequired,
            inputIconPosition={ICON_AFTER_POSITION}
            numberOfMonths={1}
            onDateChange={date => setDate(date)} // PropTypes.func.isRequired
            onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
            showDefaultInputIcon
          />
        </Box>

        <Box marginBottom='20px' width='100%'>
          <Text marginBottom='30px'>Name</Text>
          <Input
            onChange={e => setName(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. Cindy'
            ref={inputRef}
            value={name}
          />
        </Box>

        <Box width='100%'>
          <Text marginBottom='30px'>Description</Text>
          <TextArea
            marginBottom='40px'
            onChange={e => setDescription(e.target.value)}
            onClearButtonClick={() => setDescription('')}
            placeholder='Add WOD description...'
            value={description}
          />
        </Box>
      </Box>

      <Box height='auto' styledFlex='flex-end'>
        <Button
          css={css`
            align-items: center;
            background-color: grey;
            color: white;
            display: flex;
            height: 45px;
            justify-content: center;
            width: 50%;

            &:hover {
              background-color: darkgrey;
            }

            &:active {
              background-color: #666;
            }
          `}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          css={css`
            align-items: center;
            background-color: #93dba5;
            color: white;
            display: flex;
            height: 45px;
            justify-content: center;
            width: 50%;

            &:hover {
              background-color: #a1f2b6;
            }

            &:active {
              background-color: #85ca96;
            }
          `}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
      {isLoading && <Text>Loading...</Text>}
    </Box>
  );
};

WodModal.propTypes = {
  initialData: PropTypes.shape({
    date: PropTypes.object, // moment object
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

WodModal.defaultProps = {
  initialData: {
    date: null,
    description: '',
    name: '',
  },
  onCancel: null,
  onSave: null,
  setIsOpen: null,
};

export default WodModal;
