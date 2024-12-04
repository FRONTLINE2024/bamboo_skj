import styled, { keyframes } from 'styled-components';

const showModal = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

export const ModalContainer = styled.div<{ width: number; height: number }>`
  width: ${({ width }) => width}vw;
  height: ${({ height }) => height}vh;
  background-color: white;
  border-radius: 0.2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  animation: 0.5s ${showModal};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .modal {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .modalHeader {
    width: ${({ width }) => width}vw;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0.2rem 0.2rem 0 0;
    margin-top: 0.5rem;
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
  width: 25vw;
  height: 40px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  top: 10%;
  left: 40%;
  box-shadow: 0px 1px 2px 1px gray;
  border-radius: 0.2rem;
  font-family: 'GmarketSansMedium';
  background-color: white;

  animation: 0.5s ${toastShow};

  span {
    margin-right: 0.2rem;
    margin-left: 0.6rem;
  }
`;

export const SchoolContainer = styled.div`
  margin-top: 2rem;
  padding: 5px;

  main {
    margin-top: 0.3rem;
    height: 50vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    div {
      cursor: pointer;
      &:hover {
        background-color: #efefef;
        border-radius: 0.2rem;
      }
    }
  }
`;
