// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import CardPageLayout from 'organisms/CardPageLayout';
import Modal from 'organisms/Modal';
// Wods Organisms
import { WodCard, AddWod } from '../../organisms';

// WodsPage

const WodsPage = ({ wods, ...props }) => {
  // Wods

  const wodCards = wods.map((wod, i) => {
    const { date, description, name } = wod;
    return <WodCard date={date} description={description} key={`${i}${name}`} name={name} />;
  });

  // Return

  return (
    <CardPageLayout className='WodsPage' title='WODs'>
      {wodCards}

      <Modal height='650px' width='650px'>
        <AddWod />
      </Modal>
    </CardPageLayout>
  );
};

WodsPage.propTypes = {
  //
};

WodsPage.defaultProps = {
  //
};

export default WodsPage;
