import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiUserPlus, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, BackGround } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        login: Yup.string()
          .required('Login is required')
          .min(5, 'Minimum password length: 5 characters'),
        password: Yup.string().min(5, 'Minimum password length: 6 characters'),
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
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <Input name="login" icon={FiLogIn} placeholder="Login" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Sign In now</Button>
        </Form>

        <a href="signup">
          <FiUserPlus />
          Sign Up
        </a>
      </Content>
      <BackGround />
    </Container>
  );
};

export default SignIn;
