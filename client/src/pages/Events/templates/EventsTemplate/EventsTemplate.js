// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import CardPageLayout from 'organisms/CardPageLayout';
import Modal, { ModalProvider } from 'organisms/Modal';
// Event Molecules
import { EventCard, EventsSkeletonScreen } from '../../molecules';
// Event Organisms
import { EventModal } from '../../organisms';

// EventsTemplate

const EventsTemplate = ({ events, deleteEvent, isLoading, patchEvent, postEvent, ...props }) => {
  // State

  const [currentEvent, setCurrentEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions

  const handleCloseModal = () => {
    setCurrentEvent(null);
    setIsModalOpen(false);
  };

  const handleSaveEvent = ({ _id, endDate, name, startDate, type, url }) => {
    _id
      ? patchEvent({ _id, endDate, name, startDate, type, url })
      : postEvent({ endDate, name, startDate, type, url });
    setCurrentEvent(null);
    setIsModalOpen(false);
  };

  // Event

  const eventCards = events.map((event, i) => {
    console.log('event: ', event);
    const handleSetIsModalOpen = () => {
      setCurrentEvent(event);
      setIsModalOpen(true);
    };

    return (
      <EventCard
        key={`${i}${event.name}`}
        onPencilIconClick={handleSetIsModalOpen}
        onTrashIconClick={() => deleteEvent(event._id)}
        event={event}
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
        className='EventsTemplate'
        onButtonClick={() => setIsModalOpen(true)}
        title='Events'
        {...props}
      >
        {isLoading
          ? [
              <EventsSkeletonScreen key='one' />,
              <EventsSkeletonScreen key='two' />,
              <EventsSkeletonScreen key='three' />,
            ]
          : eventCards}

        <Modal height='650px' width='650px'>
          <EventModal event={currentEvent} onCancel={handleCloseModal} onSave={handleSaveEvent} />
        </Modal>
      </CardPageLayout>
    </ModalProvider>
  );
};

EventsTemplate.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.object,
    // PropTypes.shape({
    // event shape
    // }), // TODO should this be required ??
  ),
  patchEvent: PropTypes.func.isRequired,
  postEvent: PropTypes.func.isRequired,
};

EventsTemplate.defaultProps = {
  events: null,
  deleteEvent: null,
  patchEvent: null,
  postEvent: null,
};

export default EventsTemplate;
