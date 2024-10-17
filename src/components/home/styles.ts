import { theme } from '@/styles/common/color';
import styled, { keyframes } from 'styled-components';

const showModal = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const ChattingContainer = styled.div`
  width: 350px;
  height: 500px;
  position: fixed;
  bottom: 3.5rem;
  right: 3.5rem;
  z-index: 5000;

  box-shadow: 0px 1px 4px 1px gray;
  border-radius: 0.2rem;

  background-color: white;

  animation: 0.5s ${showModal};
  animation-fill-mode: forwards;

  .modalHeader {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: ${theme.primary};
    border-radius: 0.2rem 0.2rem 0 0;
  }
`;
