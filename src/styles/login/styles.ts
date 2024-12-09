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

  .container {
    height: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    transform: translateY(-10%);
  }

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

  @media (min-width: 1000px) and (max-width: 1070px) {
    .container {
      height: 45%;
    }

    .inputContainer {
      width: 25vw;
      height: 30px;
    }
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    .container {
      height: 43%;
    }
    h2 {
      font-size: 1.1rem;
    }

    .inputContainer {
      width: 23vw;
      height: 28px;
    }
  }

  @media (max-width: 800px) {
    .container {
      height: 40%;
    }
    h2 {
      font-size: 1.1rem;
    }
    .inputContainer {
      width: 23vw;
      height: 24px;
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

  @media (min-width: 1000px) and (max-width: 1070px) {
    width: 26vw;
    height: 30px;
  }

  @media (max-width: 1000px) {
    width: 24vw;
    height: 30px;
  }
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

  @media (min-width: 1000px) and (max-width: 1070px) {
    width: 26vw;
    height: 30px;
    .loginText {
      font-size: 1rem;
      text-align: center;
    }
  }

  @media (min-width: 940px) and (max-width: 1000px) {
    width: 24vw;
    height: 30px;
    .loginText {
      font-size: 0.9rem;
      text-align: center;
    }
  }

  @media (min-width: 900px) and (max-width: 940px) {
    width: 24vw;
    height: 30px;
    .loginText {
      font-size: 0.9rem;
      text-align: center;
    }
  }

  @media (max-width: 900px) {
    width: 24vw;
    height: 30px;
    .loginText {
      font-size: 0.9rem;
      text-align: start;
    }
  }
`;

export const KakaoButton = styled(SocialButton)`
  color: rgba(0, 0, 0, 0.85);
  background-color: #fee500;
  border: 2px solid #fee500;
`;
