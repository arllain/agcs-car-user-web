import React, { useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Header, HeaderContent, Profile } from './styles';
import { useAuth } from '../../hooks/auth';
import avatar from '../../assets/avatar.png';
import api from '../../services/api';

interface Car {
  id: string;
  year: string;
  licencePlate: string;
  model: string;
  color: string;
}

const DashBoard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={avatar} alt={user.firstName} />
            <div>
              <span>Welcome,</span>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </div>
            <div>
              <Link to="/profile">
                <strong>Edit profile</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      {/* <Car /> */}
    </Container>
  );
};

export default DashBoard;
