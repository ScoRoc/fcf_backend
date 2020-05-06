// Libraries
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// Airbnb Cal
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION } from 'react-dates/constants';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// @jsx jsx
import { css, jsx } from '@emotion/core';
// Atoms
import { Box, Input, Text } from 'atoms';

// AddWod

const AddWod = ({ children, ...props }) => {
  // State

  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState('');

  // Refs

  const inputRef = useRef(null);

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

  // Functions

  const handleCloseIconClick = e => {
    setName('');
    // this is valid 2020 ecma
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

        <Box marginBottom='20px' width='100%'>
          <Text marginBottom='30px'>Name</Text>
          <Input
            onChange={e => setName(e.target.value)}
            onCloseIconClick={handleCloseIconClick}
            ref={inputRef}
            value={name}
          />
        </Box>

        <Box width='100%'>
          <Text marginBottom='30px'>Description</Text>
          <Box bg='grey' width='500px' height='200px' />
          <textarea />
        </Box>
      </Box>

      <Box height='auto' styledFlex='flex-end'>
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
          <Text>Cancel</Text>
        </Box>
        <Box
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
        >
          <Text>Save</Text>
        </Box>
      </Box>
    </Box>
  );
};

AddWod.propTypes = {
  children: PropTypes.element,
};

AddWod.defaultProps = {
  children: null,
};

export default AddWod;
