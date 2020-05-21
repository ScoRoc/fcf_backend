// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Organisms
import CardPageLayout from 'organisms/CardPageLayout';
import Modal, { ModalProvider } from 'organisms/Modal';
// Announcement Molecules
import { AnnouncementCard, AnnouncementsSkeletonScreen } from '../../molecules';
// Announcement Organisms
import { AnnouncementModal } from '../../organisms';

// AnnouncementsTemplate

const AnnouncementsTemplate = ({
  announcements,
  deleteAnnouncement,
  isLoading,
  patchAnnouncement,
  postAnnouncement,
  ...props
}) => {
  // State

  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions

  const handleCloseModal = () => {
    setCurrentAnnouncement(null);
    setIsModalOpen(false);
  };

  const handleSaveAnnouncement = async ({
    _id,
    crop,
    description,
    dimensions,
    imgFile,
    originalAnnouncement,
    url,
  }) => {
    const success = _id
      ? await patchAnnouncement({
          _id,
          crop,
          description,
          dimensions,
          imgFile,
          originalAnnouncement,
          url,
        })
      : await postAnnouncement({ crop, description, dimensions, imgFile, url });
    console.log('success: ', success);
    if (success) {
      console.log('in handleSaveAnnouncement if...');
      setCurrentAnnouncement(null);
      setIsModalOpen(false);
    }
    return success;
  };

  // Announcement

  const announcementCards = announcements.map((announcement, i) => {
    const handlePencilIconClick = () => {
      setCurrentAnnouncement(announcement);
      setIsModalOpen(true);
    };

    return (
      <AnnouncementCard
        key={`${i}${announcement.url}`}
        onPencilIconClick={handlePencilIconClick}
        onTrashIconClick={() => deleteAnnouncement(announcement._id)}
        announcement={announcement}
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
        className='AnnouncementsTemplate'
        onButtonClick={() => setIsModalOpen(true)}
        title='Announcements'
        {...props}
      >
        {isLoading
          ? [
              <AnnouncementsSkeletonScreen key='one' />,
              <AnnouncementsSkeletonScreen key='two' />,
              <AnnouncementsSkeletonScreen key='three' />,
            ]
          : announcementCards}

        <Modal height='650px' width='650px'>
          <AnnouncementModal
            announcement={currentAnnouncement}
            onCancel={handleCloseModal}
            onSave={handleSaveAnnouncement}
          />
        </Modal>
      </CardPageLayout>
    </ModalProvider>
  );
};

AnnouncementsTemplate.propTypes = {
  announcements: PropTypes.arrayOf(
    PropTypes.object,
    // PropTypes.shape({
    // announcement shape
    // }), // TODO should this be required ??
  ),
  deleteAnnouncement: PropTypes.func.isRequired,
  patchAnnouncement: PropTypes.func.isRequired,
  postAnnouncement: PropTypes.func.isRequired,
};

AnnouncementsTemplate.defaultProps = {
  announcements: null,
  deleteAnnouncement: null,
  patchAnnouncement: null,
  postAnnouncement: null,
};

export default AnnouncementsTemplate;
