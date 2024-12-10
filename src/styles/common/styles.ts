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
    height: ${({ height }) => height - 5}vh;
    display: flex;
    flex-direction: column;
  }

  .modalHeader {
    width: 100%;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 0.2rem 0.2rem 0 0;
    margin-top: 0.3rem;
  }

  .close {
    margin-right: 0.4rem;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: black;
  }

  @media (min-width: 1000px) and (max-width: 1070px) {
    width: 40vw;
    height: 60vh;

    .modalHeader {
      width: 40vw;
      height: 15px;
      margin-top: 0;
    }

    .modal {
      height: 38vh;
    }

    .close {
      margin-right: 0.1rem;
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: 1000px) {
    width: 35vw;
    height: 55vh;

    .modalHeader {
      width: 35vw;
    }

    .modal {
      height: 32vh;
    }

    .close {
      margin-right: 0.1rem;
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: 650px) {
    width: 35vw;
    height: 46vh;

    .modalHeader {
      width: 35vw;
      height: 15px;
      margin-top: 0;
    }
    .boardInfoContainer {
      margin-top: 1rem;
    }

    .modal {
      height: 25vh;
    }

    .close {
      margin-right: 0.1rem;
      width: 15px;
      height: 15px;
    }
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
  width: auto;
  height: 40px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 7%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 2px 1px gray;
  border-radius: 0.2rem;
  font-family: 'GmarketSansMedium';
  background-color: white;
  animation: 0.5s ${toastShow};

  span {
    margin-left: 0.6rem;
  }

  @media (min-width: 1000px) and (max-width: 1070px) {
    width: auto;
    font-size: 0.8rem;
    padding-right: 0.4rem;
    padding-left: 0.4rem;

    span {
      font-size: 0.8rem;
      margin-right: 0.4rem;
    }
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    width: auto;
    font-size: 0.7rem;
    padding-right: 0.3rem;
    padding-left: 0.3rem;

    span {
      font-size: 0.7rem;
      margin-right: 0.3rem;
    }
  }

  @media (max-width: 800px) {
    width: auto;
    font-size: 0.6rem;
    padding-right: 0.2rem;
    padding-left: 0.2rem;

    span {
      font-size: 0.6rem;
      margin-right: 0.2rem;
    }
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
