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
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

interface CarFormData {
  year: string;
  licensePlate: string;
  model: string;
  color: string;
}

const AddCar: React.FC = () => {
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

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@car-user:token')}`,
        };

        await api.post<CarFormData>(`/api/cars`, data, { headers });

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
          title: 'Error adding a new car',
          description:
            'An error occured when adding a new car, please try again later.',
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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Add a New Car</h1>

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

export default AddCar;
