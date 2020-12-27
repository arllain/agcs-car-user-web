import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiUserPlus, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, BackGround } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  login: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string()
            .required('Login is required')
            .min(4, 'Minimum password length: 4 characters'),
          password: Yup.string().min(
            5,
            'Minimum password length: 6 characters',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          login: data.login,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description:
            'An error occured on login, please check your credentials.',
        });
      }
    },
    [signIn, addToast, history],
  );

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

        <Link to="/signup">
          <FiUserPlus />
          Sign Up
        </Link>
      </Content>
      <BackGround />
    </Container>
  );
};

export default SignIn;
