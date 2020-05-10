// Libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
// Atoms
import { Box, Button, Form, Text } from 'atoms';
// Organisms
import ThemeToggle from 'organisms/ThemeToggle';
// LoginTemplate Organisms
import { LoginInput } from '../../organisms';

// LoginTemplate

const LoginTemplate = ({ handleSubmit }) => {
  // State
  const [email, setEmail] = useState('super@super.com');
  const [password, setPassword] = useState('password');

  // Theme

  const theme = useTheme();

  // Return

  return (
    <Box
      className='LoginFullScreenContainer'
      height='100vh'
      styledFlex='center center column'
      width='100vw'
    >
      <Box
        className='LoginBox'
        css={css`
          background-color: ${theme.modalBackgroundColor};

          @media only screen and (min-width: 1250px) {
            ${'' /* padding: 40px 20%; */}
          }

          @media only screen and (min-width: 600px) and (max-width: 850px) {
            ${'' /* padding: 30px 10px; */}
          }
        `}
        flex={1}
        maxHeight='80%'
        padding='30px 80px'
        styledFlex='center space-between column'
        width='50vw'
      >
        <ThemeToggle />
        <Text>Administration Portal</Text>
        <Box
          borderRadius='50%'
          className='Logo'
          css={css`
            background-color: ${theme.colors.yellow};
          `}
          height='80px'
          margin='30px auto'
          width='80px'
        />

        <Form
          className='LoginForm'
          flex={1}
          height='auto'
          onSubmit={e => handleSubmit({ e, email, password })}
          styledFlex='stretch space-between column'
        >
          <LoginInput label='Email' onChange={e => setEmail(e.target.value)} value={email} />
          <LoginInput
            label='Password'
            onChange={e => setPassword(e.target.value)}
            margin='0'
            value={password}
          />

          <Button height='40px' marginTop='40px' type='submit' width='100%'>
            Login
          </Button>
        </Form>
      </Box>
    </Box>
  );
};

LoginTemplate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

LoginTemplate.defaultProps = {
  handleSubmit: null,
};

export default LoginTemplate;
