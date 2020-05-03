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
      bg='darkmagenta'
      className='CardFooter'
      height='70px'
      padding='0 30px'
      styledFlex='center flex-start'
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
