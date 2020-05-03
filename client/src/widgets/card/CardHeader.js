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
      bg='lightseagreen'
      className='CardHeader'
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

CardHeader.propTypes = {
  //
};

CardHeader.defaultProps = {
  //
};

export default CardHeader;
