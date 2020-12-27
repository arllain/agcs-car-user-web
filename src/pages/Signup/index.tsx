import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiLogIn,
  FiCalendar,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, BackGround } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        firstName: Yup.string()
          .required('First name is required')
          .max(30, 'Maximum first name length: 30 characters'),
        lastName: Yup.string()
          .required('Last name is required')
          .max(50, 'Maximum last name length: 50 characters'),
        email: Yup.string()
          .email('Enter a valida E-mail')
          .required('E-mail is required'),
        birthday: Yup.string().required('BirthDate  is requirer'),
        login: Yup.string()
          .required('Login  is required')
          .min(4, 'Minimum login length: 4 characters'),
        password: Yup.string().min(5, 'Minimum password length: 6 characters'),
        phone: Yup.string()
          .required('Phone  is required')
          .min(9, 'Minimum phone length: 9 characters'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <BackGround />
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Back to Sign In
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
