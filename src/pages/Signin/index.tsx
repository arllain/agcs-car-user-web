import React from 'react';
import { FiLogIn, FiUserPlus, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/signin.svg';
import { Container, Content, BackGround } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="agcs" height="235" />

      <form>
        <h1>Sign In</h1>
        <Input name="login" icon={FiLogIn} placeholder="Login" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />
        <Button type="submit">Sign In now</Button>
      </form>

      <a href="signup">
        <FiUserPlus />
        Sign Up
      </a>
    </Content>
    <BackGround />
  </Container>
);

export default SignIn;
