// Libraries
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';
// Radio Context
import { RadioContext } from '../RadioGroup/RadioGroup';

// Styles

const defaultActiveStyle = {
  alignItems: 'center',
  backgroundColor: 'blueviolet',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  height: '40px',
  justifyContent: 'center',
  width: '30%',
};

const defaultInActiveStyle = {
  alignItems: 'center',
  backgroundColor: 'mediumaquamarine',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  height: '40px',
  justifyContent: 'center',
  width: '30%',
};

// RadioButton

const RadioButton = ({ activeStyle, children, inActiveStyle, onClick, value, ...props }) => {
  const radioState = useContext(RadioContext);

  const handleClick = event => {
    // 05/20/2020
    // TODO eslint isn't recognizing the optional chaining operator (replace date after checking)
    // eslint-disable-next-line
    onClick?.({ event, value });
    radioState.setChecked(value);
  };

  return (
    <Box
      css={
        radioState.checked === value
          ? { ...defaultActiveStyle, ...activeStyle }
          : { ...defaultInActiveStyle, ...inActiveStyle }
      }
      onClick={handleClick}
      {...props}
    >
      {/* if i want to try and make accessible and tabbable */}
      {/* <input height='0' name={'RadioGroupButtons'} type='radio' value={value} width='0' /> */}
      {children}
    </Box>
  );
};

RadioButton.propTypes = {
  activeStyle: PropTypes.object, // valid style object
  inActiveStyle: PropTypes.object, // valid style object
  onClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // add PropTypes.bool if want to add checkbox support
};

RadioButton.defaultProps = {
  activeStyle: null,
  inActiveStyle: null,
  onClick: null,
  value: null,
};

export default RadioButton;
