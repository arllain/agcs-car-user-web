import styled from 'styled-components';

export const Container = styled.div`
  padding: 5px 120px;
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
  background-color: '#f5f5f5';
`;

export const Table = styled.table`
  width: 100%;
  max-width: 900px;
  border-collapse: separate;
  border-spacing: 0 10px;

  thead th {
    color: '#f5f5f5';
    text-align: left;
    padding: 10px;
    background: '#f5f5f5';
    &:first-child,
    &:last-child {
      width: 3%;
    }
    &:last-child {
      text-align: center;
    }
  }

  tbody tr {
    background: '#ffffff';
    border-collapse: separate;

    td {
      padding: 7px;
      ul {
        display: flex;
        li {
          img {
            align-items: center;
            border-radius: 50%;
            width: 21px;
            height: 21px;
            margin-left: 13px;
          }
        }
      }
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
`;

export const ContainerBottom = styled.div`
  button {
    width: 150px;
    height: 48px;
  }
`;
