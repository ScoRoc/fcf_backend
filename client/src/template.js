// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

// Template

const Template = props => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <div>
      <p>Template</p>
    </div>
  );
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
