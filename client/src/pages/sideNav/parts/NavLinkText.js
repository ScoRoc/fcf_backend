// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Text } from 'widgets';

// NavLinkText

const NavLinkText = ({ children, ...props }) => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <Text className='navLinkText' color='white' {...props}>
      {children}
    </Text>
  );
};

const buildStyle = theme => ({
  //
});

NavLinkText.propTypes = {
  //
};

NavLinkText.defaultProps = {
  //
};

export default NavLinkText;
