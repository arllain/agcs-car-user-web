import React from 'react';
import Loader from 'react-spinners/FadeLoader';
import { Container } from './styles';

const Spinner: React.FC = () => {
  return (
    <Container>
      <Loader>#999999</Loader>
    </Container>
  );
};

export default Spinner;
