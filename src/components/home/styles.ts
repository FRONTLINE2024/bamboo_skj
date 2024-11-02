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
  overflow-y: auto;

  box-shadow: 0px 1px 4px 1px gray;
  border-radius: 0.3rem;
  background-color: white;

  animation: 0.5s ${showModal};
  animation-fill-mode: forwards;

  &::-webkit-scrollbar {
    display: none;
  }

  .modalHeader {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: ${theme.primary};
    border-radius: 0.2rem 0.2rem 0 0;
  }
  .footer {
    width: 100%;
    height: 80px;
    position: sticky;
    bottom: 0;
    margin-top: 0.3rem;

    textarea {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      border-top: 2px solid #efefef;
      padding: 5px;
      border-radius: 0 0 0.2rem 0.2rem;

      font-family: 'GmarketSansMedium';

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

export const ChatData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 10px;

  .myChat {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    div {
      width: 50%;
      display: flex;
      flex-direction: column;
    }

    .userName {
      font-size: 0.9rem;
      text-align: end;
      font-family: 'GmarketSansMedium';
      margin-bottom: 0.2rem;
      color: #c0c0c0;
    }

    .myContent {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${theme.third};
      border-radius: 0.2rem 0.2rem 0 0.2rem;
      padding: 2px;

      font-size: 0.8rem;
      font-family: 'RobotoLight';
      font-weight: 550;
    }
  }

  .otherChat {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    div {
      display: flex;
      flex-direction: column;
    }

    .otherUserName {
      font-size: 0.9rem;
      font-family: 'GmarketSansMedium';
      margin-bottom: 0.2rem;
      color: #c0c0c0;
    }

    .otherContent {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${theme.fourth};
      border-radius: 0.2rem 0.2rem 0.2rem 0;
      padding: 2px;

      font-size: 0.8rem;
      font-family: 'RobotoLight';
      font-weight: 550;
    }
  }
`;
