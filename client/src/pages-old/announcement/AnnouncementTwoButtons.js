import React from 'react';

import TwoStateButtonWrapper from '../../components/components/TwoStateButtonWrapper';

const AnnouncementTwoButtons = props => {
  const { cancelOnClick, disabled, deleteOnClick, doneOnClick, editOnClick, useFirstState } = props;
  const firstButton = {
    firstState: {
      btnClass: 'edit-btn',
      btnOnClick: editOnClick,
      btnText: 'Edit',
    },
    secondState: {
      btnClass: 'done-btn',
      btnOnClick: doneOnClick,
      btnText: 'Done',
    },
  };
  const secondButton = {
    firstState: {
      btnClass: 'delete-btn',
      btnOnClick: deleteOnClick,
      btnText: 'Delete',
    },
    secondState: {
      btnClass: 'cancel-btn',
      btnOnClick: cancelOnClick,
      btnText: 'Cancel',
    },
  };
  return (
    <>
      <TwoStateButtonWrapper
        disabled={disabled}
        firstButton={firstButton}
        secondButton={secondButton}
        useFirstState={useFirstState}
        wrapperClass='AnnouncementStrip__btn-div'
      />
    </>
  );
};

export default AnnouncementTwoButtons;
