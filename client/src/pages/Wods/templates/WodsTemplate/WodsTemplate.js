// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import CardPageLayout from 'organisms/CardPageLayout';
import Modal, { ModalProvider } from 'organisms/Modal';
// Wods Molecules
import { WodCard, WodsSkeletonScreen } from '../../molecules';
// Wods Organisms
import { WodModal } from '../../organisms';

// WodsTemplate
// maybe use isLoading ?? maybe from global?
const WodsTemplate = ({ deleteWod, isLoading, patchWod, postWod, wods, ...props }) => {
  // State

  const [currentWod, setCurrentWod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions

  const handleCloseModal = () => {
    setCurrentWod(null);
    setIsModalOpen(false);
  };

  const handleSaveWod = ({ _id, date, description, name }) => {
    _id ? patchWod({ _id, date, description, name }) : postWod({ date, description, name });
    setCurrentWod(null);
    setIsModalOpen(false);
  };

  // Wods

  const wodCards = wods.map((wod, i) => {
    // console.log('wod: ', wod);
    const handleSetIsModalOpen = () => {
      setCurrentWod(wod);
      setIsModalOpen(true);
    };

    return (
      <WodCard
        key={`${i}${wod.name}`}
        onPencilIconClick={handleSetIsModalOpen}
        onTrashIconClick={() => deleteWod(wod._id)}
        wod={wod}
      />
    );
  });

  // Return

  return (
    <ModalProvider
      isOpen={isModalOpen}
      onClose={() => console.log('closing...')}
      onOpen={() => console.log('opening...')}
      onOverlayClick={handleCloseModal}
      setIsOpen={setIsModalOpen}
    >
      <CardPageLayout
        className='WodsTemplate'
        onButtonClick={() => setIsModalOpen(true)}
        title='Wods'
        {...props}
      >
        {isLoading
          ? [
              <WodsSkeletonScreen key='one' />,
              <WodsSkeletonScreen key='two' />,
              <WodsSkeletonScreen key='three' />,
            ]
          : wodCards}

        <Modal height='650px' width='650px'>
          <WodModal onCancel={handleCloseModal} onSave={handleSaveWod} wod={currentWod} />
        </Modal>
      </CardPageLayout>
    </ModalProvider>
  );
};

WodsTemplate.propTypes = {
  deleteWod: PropTypes.func.isRequired,
  patchWod: PropTypes.func.isRequired,
  postWod: PropTypes.func.isRequired,
  wods: PropTypes.arrayOf(
    PropTypes.object,
    // PropTypes.shape({
    // wod shape
    // }), // TODO should this be required ??
  ),
};

WodsTemplate.defaultProps = {
  deleteWod: null,
  patchWod: null,
  postWod: null,
  wods: [],
};

export default WodsTemplate;
