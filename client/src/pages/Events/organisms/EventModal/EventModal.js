// Libraries
import React, { useRef, useState } from 'reactn';
import PropTypes from 'prop-types';
import moment from 'moment';
// Airbnb Cal
import { DateRangePicker } from 'react-dates';
import { ICON_AFTER_POSITION } from 'react-dates/constants';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box, Button, Input, Text } from 'atoms';

// EventModal

const EventModal = ({ event, onCancel, onSave }) => {
  // Refs

  const inputRef = useRef(null);

  // State

  console.log('event in modal: ', event);
  const [endDate, setEndDate] = useState((event && event.endDate && moment(event.endDate)) || null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [name, setName] = useState(event ? event.name : '');
  const [startDate, setStartDate] = useState(
    (event && event.startDate && moment(event.startDate)) || null,
  );
  const [type, setType] = useState(event ? event.type : '');
  const [url, setUrl] = useState(event ? event.url : '');

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
        <Box alignSelf='flex-start' marginTop='40px'>
          <DateRangePicker
            enableOutsideDays
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId='event_end_date_id' // PropTypes.string.isRequired,
            firstDayOfWeek={1}
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            hideKeyboardShortcutsPanel
            id='add_event_calendar' // PropTypes.string.isRequired,
            inputIconPosition={ICON_AFTER_POSITION}
            // numberOfMonths={2}
            onDatesChange={({ startDate, endDate }) => {
              setEndDate(endDate);
              setStartDate(startDate);
            }} // PropTypes.func.isRequired,
            onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
            showClearDates
            showDefaultInputIcon
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId='event_start_date_id' // PropTypes.string.isRequired,
          />
        </Box>

        <Box marginBottom='20px' width='100%'>
          <Text marginBottom='30px'>Name</Text>
          <Input
            onChange={e => setName(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. Event name'
            ref={inputRef}
            value={name}
          />
        </Box>

        <Box marginBottom='20px' width='100%'>
          <Text marginBottom='30px'>Type</Text>
          <Input
            onChange={e => setType(e.target.value)}
            onClearIconClick={handleClearIconClick}
            placeholder='ex. social, community...'
            ref={inputRef}
            value={type}
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
      </Box>

      <Box height='auto' styledFlex='flex-end'>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={() => onSave({ _id: event && event._id, endDate, name, startDate, type, url })}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

EventModal.propTypes = {
  event: PropTypes.object,
  // event: PropTypes.shape({
  //
  // }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

EventModal.defaultProps = {
  event: null,
  onCancel: null,
  onSave: null,
};

export default EventModal;
