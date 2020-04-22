// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Input

const Input = props => {
  return (
    <label css={styles.label} htmlFor='login-email'>
      <Text size='sm'>Email</Text>
      <input
        css={styles.input}
        onChange={e => setEmail(e.target.value)}
        required
        type='email'
        value={email}
      />
    </label>
  );
}

const buildStyles = theme => ({
  //
})

const Input.propTypes = {
  //
}

const Input.defaultProps = {
  //
}

export default Input;