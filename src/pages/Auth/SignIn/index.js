import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthActions from '~/store/ducks/auth';
import Button from '~/styles/components/Button';
import { Container, SignForm } from '../styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(AuthActions.signInRequest(email, password));
  };

  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Boas vindas</h1>

        <span>E-MAIL</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <span>SENHA</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <Button size="big" type="submit">
          Entrar
        </Button>
      </SignForm>
    </Container>
  );
}
