import { theme } from '@/styles/common/color';
import styled, { keyframes } from 'styled-components';

const showModal = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

export const ModalContainer = styled.div<{ modal: boolean }>`
  width: 50vw;
  height: 70vh;
  background-color: white;
  border-radius: 0.2rem;
  position: absolute;
  top: 15%;
  right: 25%;
  z-index: 500;
  animation: 0.5s ${showModal};

  .modal {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .modalHeader {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: ${theme.primary};
    border-radius: 0.2rem 0.2rem 0 0;
  }
`;

const toastShow = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }

`;

export const ToastContainer = styled.div`
  width: 20vw;
  height: 40px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10%;
  left: 40%;
  box-shadow: 0px 1px 2px 1px gray;
  border-radius: 0.2rem;
  font-family: 'GmarketSansMedium';

  animation: 0.5s ${toastShow};

  span {
    margin-right: 1rem;
  }
`;
