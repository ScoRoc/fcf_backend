// Libraries
import React, { useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
import moment from 'moment';
// Airbnb Cal
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION } from 'react-dates/constants';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Text, TextArea } from 'atoms';
// Organisms
import LabeledInput from 'organisms/LabeledInput';

// WodModal

const WodModal = ({ onCancel, onSave, wod }) => {
  // Refs

  const inputRef = useRef(null);

  // State

  const [date, setDate] = useState(wod && moment(wod.date));
  const [description, setDescription] = useState(wod ? wod.description : '');
  const [focused, setFocused] = useState(null);
  const [name, setName] = useState(wod ? wod.name : '');

  // Functions

  const handleClearIconClick = e => {
    setName('');
    // TODO delete comment as this is valid 2020 ecma
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
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

        <LabeledInput label='Name'>
          <Input
            onChange={e => setName(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. Cindy'
            ref={inputRef}
            value={name}
          />
        </LabeledInput>

        <LabeledInput label='Description'>
          <TextArea
            onChange={e => setDescription(e.target.value)}
            onClearButtonClick={() => setDescription('')}
            placeholder='Add WOD description...'
            value={description}
          />
        </LabeledInput>
      </Box>

      <Box height='auto' styledFlex='flex-end'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave({ _id: wod && wod._id, date, description, name })}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

WodModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  wod: PropTypes.object,
  // wod: PropTypes.shape({
  //   date: PropTypes.object,
  //   description: PropTypes.string,
  //   name: PropTypes.string,
  // }),
};

WodModal.defaultProps = {
  onCancel: null,
  onSave: null,
  wod: null,
};

export default WodModal;
