import React from 'react';

const CheckboxWrapper = props => {
  const { checked, inputId, inputName, liftInput, name, value, wrapperClassName } = props;
  return (
    <div className={wrapperClassName}>
      <label htmlFor={inputId}>{name}</label>
      <input
        defaultChecked={checked}
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
