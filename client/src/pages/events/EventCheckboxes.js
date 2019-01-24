import React from 'react';

import MultiInputWrapper from '../../components/MultiInputWrapper';

import checkboxes from './event-types';

const { allCheckboxes } = checkboxes();

const EventCheckboxes = props => {
  const inputs = Object.entries(allCheckboxes).map((entry, i) => {
    const [ key, value ] = entry;
    const checked = props.type === value.type ? true : false;
    return  <MultiInputWrapper
              defaultChecked={checked}
              handleOnChange={props.handleOnChange}
              inputId={`new-event-type--${value.type}--edit`}
              key={i}
              label={value.name}
              name='edit-event-type'
              type='radio'
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
