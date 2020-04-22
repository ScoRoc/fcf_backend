import React from 'react';

const TwoStateButton = props => {
  const { disabled, firstState, secondState, useFirstState } = props;
  const btnClass = useFirstState ? firstState.btnClass : secondState.btnClass;
  const btnOnClick = useFirstState ? firstState.btnOnClick : secondState.btnOnClick;
  const btnText = useFirstState ? firstState.btnText : secondState.btnText;
  return (
    <>
      <button className={`${btnClass} ${disabled}`} disabled={disabled} onClick={btnOnClick}>{btnText}</button>
    </>
  );
}

export default TwoStateButton;
