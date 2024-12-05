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
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 1px 4px 1px gray;
  }

  .footer {
    width: 95%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    margin-top: 0.3rem;

    input {
      width: 80%;
      height: 20px;
      outline: none;
      border: 1px solid #e1e1e1;
      background-color: #efefef;
      border-radius: 0.2rem;
      padding: 5px;

      font-family: 'GmarketSansMedium';

      &::-webkit-scrollbar {
        display: none;
      }

      &:focus {
        background-color: white;
      }
    }
  }
`;

export const ChatData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
  height: 80%;
  overflow-y: auto;
  margin-top: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }

  .chatUserSearchBar {
    width: 80%;
    border: 1.5px solid #efefef;
    background-color: #efefef;
    border-radius: 0.2rem;
    outline: none;
    padding: 3px;
    color: #c1c1c1;

    font-family: 'GmarketSansLight';

    &:focus {
      border: 1.5px solid #efefef;
      background-color: white;
    }
  }
  .chatList {
    &:hover {
      cursor: pointer;
      background-color: #efefef;
      border-radius: 0.5rem;
    }
  }
  .myChat {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    overflow-y: auto;
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
