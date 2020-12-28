import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { Container, Content } from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';

interface CarFormData {
  year: string;
  licensePlate: string;
  model: string;
  color: string;
}

const EditCar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CarFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          year: Yup.number().required('Year is required'),
          licensePlate: Yup.string().required('licensePlate is required'),
          model: Yup.string().required('Model  is requirer'),
          color: Yup.string().required('Color  is required'),
        });

        await schema.validate(data, { abortEarly: false });

        // const headers = {
        //   'Content-Type': 'application/json',
        //   Authorization: `Bearer ${localStorage.getItem('@car-user:token')}`,
        // };

        // await api.put<CarFormData>(`/api/cars`, data, { headers });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Car added succesful',
          description: 'Car added succesful',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error updating',
          description: 'An error occured when updating',
        });
      }
    },
    [addToast, history],
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
        {/* initialData={{
        {{
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          login: user.login,
          birthday: user.birthday,
          phone: user.phone,
        }} */}
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Editing Car</h1>

          <Input name="year" icon={FiUser} placeholder="year" />
          <Input name="licensePlate" icon={FiUser} placeholder="licensePlate" />
          <Input name="model" icon={FiMail} placeholder="model" />
          <Input name="color" icon={FiCalendar} placeholder="color" />
          <Button type="submit">Submit</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default EditCar;
