import { theme } from '@/styles/common/color';
import styled, { keyframes } from 'styled-components';

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

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  animation: 1s ${showContainer};
  animation-fill-mode: forwards;

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

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    &::-webkit-scrollbar {
      display: none;
    }

    &:focus {
      outline: none;
    }
  }

  option {
    width: 100%;
    font-size: 0.8rem;
  }
`;

export const SchoolInput = styled.input`
  width: 85%;
  height: 20px;
  outline: none;
  border-radius: 0.2rem;
  border: 1px solid #e1e1e1;
  background-color: #efefef;
  font-family: 'GmarketSansMedium';
  padding: 3px;

  &:focus {
    background-color: white;
  }
`;
