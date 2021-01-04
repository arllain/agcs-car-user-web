import React, { useCallback, useRef } from 'react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiCamera,
  FiArrowLeft,
  FiCalendar,
  FiLogIn,
  FiPhone,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import avatar from '../../assets/avatar.png';

interface ProfileFormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  login: string;
  password: string;
  phone: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, signOut } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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
          password: Yup.string().min(
            5,
            'Minimum password length: 6 characters',
          ),
          phone: Yup.string()
            .required('Phone  is required')
            .min(9, 'Minimum phone length: 9 characters'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put(`/api/users/${user.id}`, data);

        signOut();
        history.push('/');

        addToast({
          type: 'success',
          title: 'Profile updated succesful',
          description: 'Profile updated succesful, you need to log in again',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error updating profile',
          description: 'An error occured on updating, please try again later.',
        });
      }
    },
    [addToast, history, user.id, signOut],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            login: user.login,
            birthday: user.birthday,
            phone: user.phone,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={avatar} alt={user.firstName} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>My Profile</h1>

          <Input name="firstName" icon={FiUser} placeholder="First Name" />
          <Input name="lastName" icon={FiUser} placeholder="Last Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="birthday" icon={FiCalendar} placeholder="1980-03-25" />
          <Input name="login" icon={FiLogIn} placeholder="Login" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Input name="phone" icon={FiPhone} placeholder="81998883214" />
          <Button type="submit">Update profile</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
