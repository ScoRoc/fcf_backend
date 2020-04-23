// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// NavLink Parts
import NavLink from './NavLink';

// NavLinkGroup

const NavLinkGroup = props => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <div>
      <NavLink />
    </div>
  );
};

const buildStyle = theme => ({
  //
});

NavLinkGroup.propTypes = {
  //
};

NavLinkGroup.defaultProps = {
  //
};

export default NavLinkGroup;
