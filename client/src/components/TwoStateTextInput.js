import React from 'react';

const TwoStateTextInput = props => {
  const {
    onChange,
    onKeyUp,
    pClass,
    useInput,
    value
  } = props;
  const displayText = useInput
                      ? <input
                          onChange={onChange}
                          onKeyUp={onKeyUp}
                          type='text'
                          value={value}
                        />
                    : <p className={pClass}>{value}</p>;
  return (
    <>
      {displayText}
    </>
  );
}

export default TwoStateTextInput;
