import React from 'react';

const CheckboxWrapper = props => {
  const { inputId, inputName, liftInput, name, value, wrapperClassName } = props;
  return (
    <div className={wrapperClassName}>
      <label htmlFor={inputId}>{name}</label>
      <input
        id={inputId}
        name={name}
        onChange={liftInput}
        type='checkbox'
        value={value}
      />
    </div>
  )
}

export default CheckboxWrapper;
