import styled, { keyframes } from 'styled-components';

export const ModalContainer = styled.div`
  width: 40vw;
  height: 60vh;
  background-color: white;
  border-radius: 0.2rem;
  position: absolute;
  top: 25%;
  right: 30%;
  z-index: 500;

  .modal {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .modalHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 0.3rem;
  }

  .logo {
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
