import React from 'react';

import CheckboxWrapper from '../../components/CheckboxWrapper';

import checkboxes from './event-types';

const { allCheckboxes } = checkboxes();

const EventCheckboxes = props => {
  const inputs = Object.entries(allCheckboxes).map((entry, i) => {
    const [ key, value ] = entry;
    const checked = props.types.includes(value.type);
    return  <CheckboxWrapper
              checked={checked}
              inputId={`new-event-type--${value.type}--edit`}
              inputName='type'
              key={i}
              liftInput={props.liftInput}
              name={value.name}
              value={value.type}
              wrapperClassName={`AddEvent__form__type-wrap__${value.type}`}
            />

  });
  return (
    <>
      {inputs}
    </>
  );
}

export default EventCheckboxes;
