// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Cal 1
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// Cal 2
import DatePicker from 'react-date-picker';
// Airbnb Cal
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Text } from 'atoms';

// AddWod

const AddWod = ({ children }) => {
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [startDate, setStartDate] = useState(null);

  return (
    <React.Fragment>
      <Box flex={1} padding='50px 50px' styledFlex='stretch space-between column'>
        {/* <Calendar /> */}
        {/* <DatePicker /> */}

        <DateRangePicker
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId='your_unique_start_date_id' // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId='your_unique_end_date_id' // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => {
            setEndDate(endDate);
            setStartDate(startDate);
          }} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
        />

        <Text>Name</Text>
        <Box bg='grey' width='500px' height='50px'></Box>

        <Text>Description</Text>
        <Box bg='grey' width='500px' height='200px'></Box>
      </Box>

      <Box styledFlex='stretch'>
        <Box
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
        >
          <Text>Preview</Text>
        </Box>
        <Box
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
        >
          <Text>Save</Text>
        </Box>
      </Box>
    </React.Fragment>
  );
};

AddWod.propTypes = {
  children: PropTypes.element,
};

AddWod.defaultProps = {
  children: null,
};

export default AddWod;
