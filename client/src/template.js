// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Box } from 'widgets';

// Template

const Template = ({ children }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return <Box className='Template'>{children}</Box>;
};

const buildStyle = theme => ({
  //
});

Template.propTypes = {
  //
};

Template.defaultProps = {
  //
};

export default Template;
