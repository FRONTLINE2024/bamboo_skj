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

export const Container = styled.div<{ $borderColor: string }>`
  box-shadow: ${(props) => {
    switch (props.$borderColor) {
      case '#0B4A8F':
        return `inset 0px 0px 10px 8px #0B4A8F`; // universityBlue
      case '#42AE37':
        return `inset 0px 0px 10px 8px #42AE37`; // universityGreen
      case '#D60F14':
        return `inset 0px 0px 10px 5px #D60F14`; // universityRed
      case '#8B7E75':
        return `inset 0px 0px 10px 8px #8B7E75`; // universityGray
      default:
        return; // 기본 색상
    }
  }};
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
      width: 94%;
      outline: none;
      border: none;
      font-family: 'GmarketSansMedium';
      color: black;
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

export const InputContainer = styled.div<{ $borderColor: string }>`
  width: 30vw;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: ${(props) => {
    switch (props.$borderColor) {
      case '#0B4A8F':
        return `2px solid #0B4A8F`; // universityBlue
      case '#42AE37':
        return `2px solid #42AE37`; // universityGreen
      case '#D60F14':
        return `2px solid #D60F14`; // universityRed
      case '#8B7E75':
        return `2px solid #8B7E75`; // universityGray
      default:
        return `2px solid ${theme.inputBorderColor}`; // 기본 색상
    }
  }};
  padding: 5px;
  border-radius: 0.3rem;

  input {
    width: 94%;
    outline: none;
    border: none;
    font-family: 'GmarketSansMedium';
    color: black;
  }
`;
