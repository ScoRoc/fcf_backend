// Libraries
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from '@reach/portal';
import { useTransition } from 'react-spring';
// @jsx jsx
import { jsx } from '@emotion/core';
// Atoms
import { AnimatedBox } from 'atoms';
// Modal Organisms
import { ModalContext } from '../ModalProvider/ModalProvider';
// Custom Hooks
import { useTraceableState } from 'hooks';

// Modal

const Modal = ({ children, height, width, ...props }) => {
  // Refs

  const modalRef = useRef(null);

  // Context

  const { isOpen, onClose, onOpen, onOverlayClick } = useContext(ModalContext);

  // Traceable State

  const [_, setTraceableState, prevIsOpen] = useTraceableState(isOpen);

  // Effects

  useEffect(() => {
    if (isOpen) {
      // this is valid 2020 ecma
      // eslint-disable-next-line no-unused-expressions
      onOpen?.();
      setTraceableState(isOpen);
    }
    if (prevIsOpen === true && !isOpen) {
      // this is valid 2020 ecma
      // eslint-disable-next-line no-unused-expressions
      onClose?.();
      setTraceableState(isOpen);
    }
  }, [isOpen]);

  // Functions

  const handleClick = e => {
    if (!modalRef?.current?.contains(e.target)) {
      // this is valid 2020 ecma
      // eslint-disable-next-line no-unused-expressions
      onOverlayClick?.();
    }
  };

  // Animation

  const transitions = useTransition(isOpen, null, {
    config: {
      clamp: true,
      friction: 24,
      mass: 0.8,
      tension: 270,
      velocity: 0,
    },
    enter: [
      {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: '0px',
        width,
      },
      { height },
    ],
    from: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      height: '0px',
      width,
    },
    leave: [{ width: '0px' }, { backgroundColor: 'rgba(0, 0, 0, 0)' }],
  });

  const modal = transitions.map(
    ({ item, key, props: { backgroundColor, height, width } }) =>
      item && (
        <Portal key={key}>
          <AnimatedBox
            className='ModalOverlay'
            left='0'
            onClick={handleClick}
            paddingLeft='250px'
            position='absolute'
            style={{ backgroundColor }}
            styledFlex='center center'
            top='0'
            zIndex='9999'
          >
            <AnimatedBox
              backgroundColor='white'
              boxShadow='0 0 10px 1px rgba(0, 0, 0, .2)'
              className='Modal'
              overflow='hidden'
              position='relative'
              ref={modalRef}
              style={{ height, width }}
              styledFlex='center center'
              width='300px'
              {...props}
            >
              {children}
            </AnimatedBox>
          </AnimatedBox>
        </Portal>
      ),
  );

  return <React.Fragment key={'foogazi'}>{modal}</React.Fragment>;
};

Modal.propTypes = {
  height: PropTypes.string, // valid height string
  width: PropTypes.string, // valid width string
};

Modal.defaultProps = {
  height: '300px',
  width: '300px',
};

export default Modal;
