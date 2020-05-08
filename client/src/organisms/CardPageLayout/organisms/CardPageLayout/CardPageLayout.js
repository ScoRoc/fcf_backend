// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { Box } from 'atoms';
// Organisms
import { ModalProvider } from '../../../Modal';
// CardPageLayout Molecules
import { CardPageTitleBar } from '../../molecules';

// CardPageLayout

const CardPageLayout = ({ children, isModalOpen, setIsModalOpen, title, ...props }) => (
  <Box
    className='CardPageLayout'
    flex={1}
    overflowY='scroll'
    padding='30px 30px 0 30px'
    styledFlex='center flex-start column'
    {...props}
  >
    <ModalProvider
      isOpen={isModalOpen}
      onClose={() => console.log('closing...')}
      onOpen={() => console.log('opening...')}
      onOverlayClick={() => setIsModalOpen(false)}
      setIsOpen={setIsModalOpen}
    >
      <CardPageTitleBar onButtonClick={() => setIsModalOpen(true)} title={title} />
      {children}
    </ModalProvider>
  </Box>
);

CardPageLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

CardPageLayout.defaultProps = {
  title: 'Add a title...',
};

export default CardPageLayout;