// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Text } from 'atoms';
// Organisms
import { CardColumn, Separator } from 'organisms/Card';
import ItemLongCard from 'organisms/ItemLongCard';
import Modal from 'organisms/Modal';
// Wods Organisms
import { WodModal } from '../../organisms';

// WodCard

const WodCard = ({
  date,
  deleteWod,
  description,
  name,
  patchWod,
  setIsModalOpen,
  totalLiked,
  ...props
}) => {
  const day = moment(date).format('D');
  const month = moment(date).format('MMM');
  const year = moment(date).format('YYYY');

  const formattedDate = `${month} ${day}, ${year}`;

  // Return

  return (
    <ItemLongCard
      className='WodCard'
      deleteItem={deleteWod}
      marginBottom='20px'
      setIsModalOpen={setIsModalOpen}
      showViewedBy={false}
      totalLiked={totalLiked}
      {...props}
    >
      <CardColumn>
        <Text>{formattedDate}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{name}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{description}</Text>
      </CardColumn>

      {/* <Modal height='650px' width='650px'>
        <WodModal
          initialData={{ date: date._d, description, name }}
          // onCancel={onCancel}
          onSave={patchWod}
          setIsOpen={setIsModalOpen}
        />
      </Modal> */}
    </ItemLongCard>
  );
};

WodCard.propTypes = {
  date: PropTypes.string.isRequired,
  deleteWod: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  editItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  patchWod: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  totalLiked: PropTypes.number.isRequired,
};

WodCard.defaultProps = {
  date: null,
  deleteWod: null,
  description: null,
  editItem: null,
  name: null,
  patchWod: null,
  setIsModalOpen: null,
  totalLiked: null,
};

export default WodCard;
