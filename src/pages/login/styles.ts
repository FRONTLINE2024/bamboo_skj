import styled from 'styled-components';

import { theme } from '@/styles/common/color';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h2 {
    font-family: 'GmarketSansBold';
  }

  .inputContainer {
    width: 30vw;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 2px solid ${theme.inputBorderColor};
    padding: 5px;
    border-radius: 0.3rem;

    input {
      width: 90%;
      outline: none;
      border: none;
      font-family: 'GmarketSansLight';
      color: ${theme.inputTextColor};
    }

    &:focus-within {
      border: 2px solid ${theme.primary};
    }
  }
`;

const Button = styled.button`
  width: 31vw;
  height: 40px;
  padding: 5px;
  border-radius: 0.3rem;
  font-family: 'GmarketSansMedium';
  background-color: white;

  outline: none;
  border: none;
`;

export const LoginButton = styled(Button)`
  color: ${theme.primary};
  border: 2px solid ${theme.primary};

  &:hover {
    background: ${theme.primary};
    color: white;
  }
`;

export const SignupButton = styled(Button)`
  background: ${theme.primary};
  color: white;

  &:hover {
    color: ${theme.primary};
    background: white;
    border: 2px solid ${theme.primary};
  }
`;
