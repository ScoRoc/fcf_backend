import React from 'react';

const MultiInputWrapper = props => {
  const { defaultChecked, inputId, label, name, type, handleOnChange, value, wrapperClassName } = props;
  return (
    <div className={wrapperClassName}>
      <label htmlFor={inputId}>{label}</label>
      <input
        defaultChecked={defaultChecked}
        id={inputId}
        name={name}
        onChange={handleOnChange}
        type={type}
        value={value}
      />
    </div>
  )
}

export default MultiInputWrapper;
