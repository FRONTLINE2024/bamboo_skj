import styled, { keyframes } from 'styled-components';

import { theme } from '@/styles/common/color';

const showContainer = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform:  translateY(-10px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  animation: 1s ${showContainer};
  animation-fill-mode: forwards;

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
  cursor: pointer;
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

const SocialButton = styled.div`
  width: 31vw;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.3rem;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  > .btn {
    background: none;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginText {
    width: 8rem;
    text-align: end;
  }
`;

export const KakaoButton = styled(SocialButton)`
  color: rgba(0, 0, 0, 0.85);
  background-color: #fee500;
  border: 2px solid #fee500;
`;
