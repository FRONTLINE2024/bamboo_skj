import styled, { keyframes } from 'styled-components';
import { theme } from './common/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  .publisher {
    font-family: 'GmarketSansBold';
    font-size: 1.2rem;
  }

  .date {
    margin-bottom: 0.2rem;
    font-family: 'GmarketSansMedium';
  }

  .content {
    width: 100%;
    height: 40vh;
    overflow-y: scroll;
    margin-right: 0.3rem;
    font-family: 'GmarketSansLight';
  }

  .content::-webkit-scrollbar {
    display: none;
  }

  .row {
    display: flex;
    flex-direction: row;
  }
  .boardWriteContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }

  .boardWriteTitle {
    display: flex;
    justify-content: flex-start;
    align-items: space-between;
    flex-direction: column;
  }

  .boardTitleInput {
    width: 50%;
    font-family: 'GmarketSansMedium';
    padding: 0.5rem;
    border: 1px solid gray;
    border-radius: 0.2rem;
    outline: none;
    border: 1px solid #dddddd;

    &:focus {
      border: 1px solid ${theme.primary};
    }
  }

  .boardContent {
    display: flex;
    max-width: 99%;
    min-height: 40vh;
    font-family: 'GmarketSansLight';
    font-weight: 600;
    padding: 0.5rem;
    border: 1px solid #dddddd;
    border-radius: 0.2rem;

    outline: none;

    &:focus {
      border: 1px solid ${theme.primary};
    }
  }

  .boardContent2 {
    display: flex;
    width: 90%;
    min-height: 30vh;
    font-family: 'GmarketSansLight';
    font-weight: 600;
    padding: 0.5rem;
    border: 1px solid #dddddd;
    border-radius: 0.2rem;

    outline: none;

    &:focus {
      border: 1px solid ${theme.primary};
    }
  }
  .boardWriteFile {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
  }
  .btn-upload {
    background-color: white;
  }

  .btnUpload {
    width: 6vw;
    padding: 5px;
    cursor: pointer;
    border-radius: 0.2rem;
    text-align: center;
    font-size: 0.8rem;
    color: ${theme.secondary};
    border: 1px solid ${theme.secondary};
    font-family: 'GmarketSansMedium';

    &:hover {
      color: white;
      background-color: ${theme.primary};
    }
  }

  #file {
    display: none;
  }
`;

export const HomeHeader = styled.header`
  z-index: 1;
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 0px 5px 1px gray;

  .projectTitle {
    cursor: pointer;
    font-family: 'GmarketSansBold';
    font-size: 1.3rem;
  }

  .headerContainer {
    width: 6%;
    display: flex;
    flex-direction: row;
  }
  .search {
    cursor: pointer;
  }

  .user {
    cursor: pointer;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 2rem;
  margin-top: 1rem;

  select {
    width: auto;
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 0.2rem;
    border: 1px solid #e2e2e2;
    background-color: #f5f5f5;
    font-family: 'GmarketSansMedium';
    cursor: pointer;
  }

  .sortButton {
    width: auto;
    height: 30px;
    padding: 10px;
    display: flex;
    align-items: center;
    border: 1px solid #e2e2e2;
    background-color: #f5f5f5;
    font-family: 'GmarketSansMedium';
    cursor: pointer;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  flex-grow: 0.4;

  &::-webkit-scrollbar {
    display: none;
  }

  .boardContainer {
    display: flex;
    justify-content: center;
    width: 40%;
    cursor: pointer;
  }
  .boardHeader {
    width: 100%;
    height: 15px;
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: ${theme.primary};
  }

  .boardStructure {
    padding: 5px;
  }

  .boardColumn {
    width: 90%;
    height: 120px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 2px 1px gray;
    border-radius: 0.2rem;
    margin: 10px;
  }

  .boardRow {
    display: flex;
    align-items: center;
    padding: 5px;
  }

  .boardStructure {
    flex-grow: 1;
  }

  .boardTitle {
    font-family: 'GmarketSansMedium';
  }

  .boardCreateAt {
    font-family: 'GmarketSansLight';
    font-size: 0.8rem;
  }

  img {
    margin-left: 10px;
    object-fit: contain;
  }
`;

export const HomeInput = styled.input`
  width: 30%;
  height: 30px;
  border: 2px solid transparent;
  outline: none;
  background-color: #efefef;
  border-radius: 0.2rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;

  &:focus {
    background-color: white;
    border-color: ${theme.primary};
  }
`;

export const WriteBtn = styled.button`
  border-radius: 0.2rem;
  outline: none;
  border: 1px solid ${theme.primary};
  padding: 5px;

  cursor: pointer;
  font-family: 'GmarketSansMedium';
  font-weight: 400;
  background-color: ${theme.primary};
  color: white;

  &:hover {
    background-color: white;
    color: ${theme.primary};
    border: 1px solid ${theme.primary};
  }
`;

export const DeleteBtn = styled.button`
  border-radius: 0.2rem;
  outline: none;
  border: 1px solid ${theme.secondary};
  padding: 5px;

  cursor: pointer;
  font-family: 'GmarketSansMedium';
  font-weight: 400;
  background-color: ${theme.secondary};
  color: white;

  &:hover {
    background-color: white;
    color: ${theme.secondary};
    border: 1px solid ${theme.secondary};
  }
`;

export const ModifyBtn = styled.button`
  border-radius: 0.2rem;
  outline: none;
  border: 1px solid ${theme.secondary};
  padding: 5px;

  cursor: pointer;
  font-family: 'GmarketSansMedium';
  font-weight: 400;
  background-color: ${theme.secondary};
  color: white;

  &:hover {
    background-color: white;
    color: ${theme.secondary};
    border: 1px solid ${theme.secondary};
  }
`;
