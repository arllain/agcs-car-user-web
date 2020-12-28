import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Table, ContainerBottom } from './styles';
import EmptyList from '../../components/EmptyList';
import api from '../../services/api';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

interface Car {
  id: string;
  year: string;
  licensePlate: string;
  model: string;
  color: string;
}

const Car: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const history = useHistory();
  const { addToast } = useToast();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('@car-user:token')}`,
  };

  useEffect(() => {
    api
      .get<Car[]>(`/api/cars`, { headers })
      .then(response => {
        setCars(response.data);
      });
  }, [headers]);

  function handleAdd() {
    history.push('/addCar');
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/api/cars/${id}`, { headers });

      history.push('/');

      addToast({
        type: 'success',
        title: 'Car deleted succesfully',
        description: 'Car deleted succesful',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Profile updated succesful',
        description: 'Something went wrong',
      });
    }
  }

  function handleEdit(car: Car) {
    history.push(`/editCar/${car.id}`);
  }

  return (
    <Container>
      {!cars.length ? (
        <EmptyList />
      ) : (
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Year</th>
              <th>Lisence Plate</th>
              <th>Model</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 &&
              cars.map(car => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.year}</td>
                  <td>{car.licensePlate}</td>
                  <td>{car.model}</td>
                  <td>{car.color}</td>
                  <td>
                    <Button type="button" onClick={() => handleEdit(car)}>
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button type="button" onClick={() => handleDelete(car.id)}>
                      Delete
                    </Button>
                  </td>
                  <td />
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <ContainerBottom>
        <Button type="button" onClick={handleAdd}>
          Add Car
        </Button>
      </ContainerBottom>
    </Container>
  );
};

export default Car;
