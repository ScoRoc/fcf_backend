// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// Card

const Card = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Box bg='sienna' className='Card' height='300px' width='100%' {...props}>
      {children}
    </Box>
  );
};

const buildStyle = theme => ({
  //
});

Card.propTypes = {
  //
};

Card.defaultProps = {
  //
};

export default Card;
