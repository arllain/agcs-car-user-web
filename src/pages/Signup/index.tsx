import React from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiLogIn,
  FiCalendar,
} from 'react-icons/fi';
import { Container, Content, BackGround } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <BackGround />
    <Content>
      <form>
        <h1>Sign Up</h1>
        <Input name="firstName" icon={FiUser} placeholder="First Name" />
        <Input name="lastName" icon={FiUser} placeholder="Last Name" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input name="birthday" icon={FiCalendar} placeholder="Birthday" />
        <Input name="login" icon={FiLogIn} placeholder="Login" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />
        <Input name="phone" icon={FiPhone} placeholder="Phone Number" />
        <Button type="submit">Sign Up now</Button>
      </form>

      <a href="criar">
        <FiArrowLeft />
        Back to Sign In
      </a>
    </Content>
  </Container>
);

export default SignUp;
