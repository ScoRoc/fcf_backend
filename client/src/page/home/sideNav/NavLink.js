// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Text } from 'widgets';

// NavLink

const NavLink = ({ text }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <div>
      <Text variant='secondary'>{text}</Text>
    </div>
  );
};

const buildStyle = theme => ({
  //
});

NavLink.propTypes = {
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.string]),
};

NavLink.defaultProps = {
  text: 'NavLink',
};

export default NavLink;
