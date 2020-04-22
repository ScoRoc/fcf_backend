// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

// Text

const Text = ({ color, size, ...props }) => {
  // Theme and Styles

  const theme = useTheme();
  const styles = buildStyles({ color, size, theme });

  // Return

  return (
    <p css={styles.p} {...props}>
      {props.children}
    </p>
  );
};

const buildStyles = ({ color, size, theme }) => ({
  p: {
    color: color || theme.color,
    fontSize: theme.sizes[size],
    margin: 0,
  },
});

Text.propTypes = {
  color: 'string', // SHOULD BE ONE OF THEME COLORS ONLY
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Text.defaultProps = {
  color: null,
  size: 'sm',
};

export default Text;
