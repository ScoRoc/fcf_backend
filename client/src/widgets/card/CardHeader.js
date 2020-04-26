// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// CardHeader

const CardHeader = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Box
      alignItems='center'
      bg='lightseagreen'
      className='CardHeader'
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

CardHeader.propTypes = {
  //
};

CardHeader.defaultProps = {
  //
};

export default CardHeader;
