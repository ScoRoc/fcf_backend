// Libraries
import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';

// Context

const initialValue = {
  isOpen: false,
  onClose: null,
  onOpen: null,
  onOverlayClick: null,
};

export const ModalContext = createContext(initialValue);

// ModalProvider

const ModalProvider = ({ children, isOpen, onClose, onOpen, onOverlayClick, setIsOpen }) => {
  // Effects

  useEffect(() => {
    const closeModal = e => {
      e.preventDefault();
      if (e.key === 'Escape' && e.target.type !== 'text' && e.target.tagName !== 'INPUT') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keyup', closeModal);
    return () => window.removeEventListener('keyup', closeModal);
  }, []);

  // Return

  return (
    <ModalContext.Provider
      className='ModalContextProvider'
      value={{ isOpen, onClose, onOpen, onOverlayClick, setIsOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onOverlayClick: PropTypes.func,
  setIsOpen: PropTypes.func,
};

ModalProvider.defaultProps = {
  isOpen: null,
  onClose: null,
  onOpen: null,
  onOverlayClick: null,
  setIsOpen: null,
};

export default ModalProvider;
