import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/signin.svg';
import { Container, Content, BackGround } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="agcs" height="235" />

      <form>
        <h1>Sign In</h1>
        <input placeholder="login" />
        <input type="password" placeholder="Password" />
        <button type="submit">Enter</button>
      </form>

      <a href="criar">
        <FiLogIn />
        Sign Up
      </a>
    </Content>
    <BackGround />
  </Container>
);

export default SignIn;
