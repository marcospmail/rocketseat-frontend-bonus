import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthActions from '~/store/ducks/auth';
import Button from '~/styles/components/Button';
import { Container, SignForm } from '../styles';

export default function SignUp() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(AuthActions.signUpRequest(name, email, password));
  };

  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Criar conta</h1>

        <span>NAME</span>
        <input value={name} onChange={handleNameChange} />

        <span>E-MAIL</span>
        <input type="email" value={email} onChange={handleEmailChange} />

        <span>PASSWORD</span>
        <input
          type="password"
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
