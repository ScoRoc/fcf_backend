import React from 'react';

import TwoStateButton from './TwoStateButton';

const TwoStateButtonWrapper = props => {
  const { disabled, firstButton, secondButton, useFirstState, wrapperClass } = props;
  return (
    <div className={wrapperClass}>
      <TwoStateButton disabled={disabled} firstState={firstButton.firstState} secondState={firstButton.secondState} useFirstState={useFirstState} />
      <TwoStateButton disabled='' firstState={secondButton.firstState} secondState={secondButton.secondState} useFirstState={useFirstState} />
    </div>
  );
}

export default TwoStateButtonWrapper;
