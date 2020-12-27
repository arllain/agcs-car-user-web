import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Header, HeaderContent, Profile } from './styles';
import { useAuth } from '../../hooks/auth';
import avatar from '../../assets/avatar.png';

const DashBoard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={avatar} alt={user.firstName} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default DashBoard;
