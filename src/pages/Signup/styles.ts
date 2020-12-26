import styled from 'styled-components';
import { shade } from 'polished';
import singUpBackgroundImg from '../../assets/signup.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
  form {
    margin: 20px 0px;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 10px;
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: background-color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #f4ede8;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
export const BackGround = styled.div`
  flex: 1;
  background: url(${singUpBackgroundImg}) no-repeat center;
  background-size: 450px 450px;
`;
