// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import CardPageLayout from 'organisms/CardPageLayout';
import Modal from 'organisms/Modal';
// Wods Organisms
import { WodModal, WodCard, WodsSkeletonScreen } from '../../organisms';

// WodsTemplate
// maybe use isLoading ?? maybe from global?
const WodsTemplate = ({ deleteWod, isLoading, onCancel, patchWod, postWod, wods, ...props }) => {
  // State

  const [editingWod, setEditingWod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Wods

  const wodCards = wods.map((wod, i) => {
    console.log('wod: ', wod);
    const { date, description, likedBy, name } = wod;
    const handleSetIsModalOpen = () => {
      setEditingWod(wod);
      setIsModalOpen(true);
    };

    return (
      <WodCard
        date={date}
        deleteWod={() => deleteWod(wod._id)}
        description={description}
        patchWod={patchWod}
        key={`${i}${name}`}
        name={name}
        patchWod={patchWod}
        setIsModalOpen={handleSetIsModalOpen}
        totalLiked={likedBy.length}
      />
    );
  });

  const initialData = editingWod && {
    date: moment(editingWod.date),
    description: editingWod.description,
    name: editingWod.name,
  };

  // Return

  return (
    <CardPageLayout
      className='WodsTemplate'
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title='WODs'
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
        <WodModal
          initialData={initialData}
          onCancel={onCancel}
          onSave={postWod}
          setIsOpen={setIsModalOpen}
        />
      </Modal>
    </CardPageLayout>
  );
};

WodsTemplate.propTypes = {
  onCancel: PropTypes.func,
  postWod: PropTypes.func,
  wods: PropTypes.arrayOf(
    PropTypes.shape({
      // wod shape
    }), // TODO should this be required ??
  ),
};

WodsTemplate.defaultProps = {
  onCancel: null,
  postWod: null,
  wods: [],
};

export default WodsTemplate;
