// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// CardFooter

const CardFooter = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Box
      alignItems='center'
      bg='darkmagenta'
      className='CardFooter'
      display='flex'
      height='70px'
      justifyContent='flex-start'
      padding='0 30px'
      {...props}
    >
      {children}
    </Box>
  );
};

const buildStyle = theme => ({
  //
});

CardFooter.propTypes = {
  //
};

CardFooter.defaultProps = {
  //
};

export default CardFooter;
