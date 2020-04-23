// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Widgets
import { Text } from 'widgets';

// NavHeader

const NavHeader = props => {
  // Styles and Theme

  const theme = useTheme();
  const styles = buildStyle(theme);

  return (
    <header css={styles.header}>
      {/* Nav Header */}
      <Text style={{ marginRight: '10px' }} variant='secondary'>
        [logo]
      </Text>
      <Text variant='secondary'>Foundation CrossFit</Text>
    </header>
  );
};

const buildStyle = theme => ({
  header: {
    alignItems: 'center',
    background: 'darkgreen',
    boxSizing: 'border-box',
    display: 'flex',
    height: '150px',
    justifyContent: 'center',
    padding: '20px',
  },
});

NavHeader.propTypes = {
  //
};

NavHeader.defaultProps = {
  //
};

export default NavHeader;
