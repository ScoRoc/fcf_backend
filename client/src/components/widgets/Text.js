// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

// Text

const Text = ({ size, ...props }) => {
  // Theme

  const theme = useTheme();

  // Styles

  const styles = buildStyles({ size, theme });

  // Return

  return (
    <p css={styles.p} {...props}>
      {props.children}
    </p>
  );
};

const buildStyles = ({ size, theme }) => ({
  p: {
    color: theme.color,
    fontSize: theme.sizes[size],
    margin: 0,
  },
});

Text.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Text.defaultProps = {
  size: 'sm',
};

export default Text;
