import styled from 'styled-components';
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
  .boardInfoContainer {
    height: 95%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
    margin-top: 2rem;
  }

  .publisher {
    font-family: 'GmarketSansBold';
    font-size: 1.2rem;
  }

  @media (max-width: 1000px) {
    .publisher {
      font-size: 1rem;
    }
  }

  .nickname {
    margin-left: 5px;
  }

  @media (max-width: 1000px) {
    .nickname {
      font-size: 0.8rem;
    }
  }

  .date {
    margin-bottom: 0.2rem;
    font-family: 'GmarketSansMedium';
  }

  @media (max-width: 1000px) {
    .date {
      font-size: 0.9rem;
    }
  }

  .content {
    width: 90%;
    height: 40vh;
    overflow-y: scroll;
    margin-right: 0.3rem;
    font-family: 'GmarketSansLight';
  }

  @media (min-width: 1000px) and (max-width: 1070px) {
    .content {
      height: 35vh;
    }
  }

  @media (min-width: 650px) and (max-width: 1000px) {
    .content {
      height: 25vh;
    }
  }

  @media (max-width: 650px) {
    .content {
      height: 15vh;
    }
  }

  @media (max-width: 1000px) {
    .content {
      font-size: 0.9rem;
    }
  }

  .content::-webkit-scrollbar {
    display: none;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 1000px) {
    .row {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
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
    margin-top: 1.5rem;
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
    height: 40vh;
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

  @media (min-width: 1000px) and (max-width: 1070px) {
    .boardTitleInput {
      font-size: 0.8rem;
    }

    .boardContent {
      min-height: 35vh;
      font-size: 0.8rem;
    }
  }

  @media (min-width: 650px) and (max-width: 1000px) {
    .boardTitleInput {
      font-size: 0.7rem;
    }
    .boardContent {
      min-height: 30vh;
      font-size: 0.7rem;
    }
  }

  @media (max-width: 650px) {
    .boardTitleInput {
      font-size: 0.7rem;
    }
    .boardContent {
      min-height: 25vh;
      font-size: 0.7rem;
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

    @media (max-width: 1070px) {
      .boardContent2 {
        height: 15vh;
      }
    }
  }
  .boardInfoButtonRow {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 12vh;
  }

  @media (max-width: 1070px) {
    .boardInfoButtonRow {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      height: 8vh;
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
    width: 100px;
    height: 19px;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    color: ${theme.secondary};
    border: 1px solid ${theme.secondary};
    font-family: 'GmarketSansMedium';

    &:hover {
      color: white;
      background-color: ${theme.primary};
    }
  }

  @media (min-width: 1000px) and (max-width: 1070px) {
    .btnUpload {
      width: 90px;
      height: 15px;
      font-size: 0.7rem;
    }
  }

  @media (max-width: 1000px) {
    .btnUpload {
      width: 80px;
      height: 13px;
      font-size: 0.7rem;
    }
  }

  #file {
    display: none;
  }

  .chatSpinner {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;
    color: ${theme.secondary};
    border: 2px solid ${theme.secondary};

    &:hover {
      transition: 0.5s transform;
      transform: scale(1.1);
    }

    * {
      width: 36px;
      height: 36px;
    }
  }
`;

export const HomeHeader = styled.header<{ $dropdownboolean: string }>`
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
    height: 100px;
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 5px;
  }
  .search {
    cursor: pointer;
  }

  .user {
    cursor: pointer;
    box-shadow: ${(props) =>
      props.$dropdownboolean === 'true' ? '0px 1px 2px 1px gray' : null};
    border-radius: 50%;
  }

  .logoutIcon {
    cursor: pointer;
    /* position: absolute;
    margin-top: 4rem; */

    background-color: white;
    box-shadow: ${(props) =>
      props.$dropdownboolean === 'true' ? '0px 1px 2px 1px gray' : null};
    border-radius: 50%;
    padding: 5px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5rem;
  margin-top: 1rem;

  .navRow {
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  select,
  .sortButton {
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 0.2rem;
    border: 1px solid #e2e2e2;
    background-color: #f5f5f5;
    font-family: 'GmarketSansMedium';
    cursor: pointer;
  }

  select {
    width: auto;
  }

  .sortButton {
    text-align: center;
  }

  @media (max-width: 970px) {
    .navRow {
      width: 120px;
    }
  }
`;

export const Main = styled.main<{ $width: number }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* flex-grow: 0.4; */

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

  .btnRow {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 4px;
    height: 80%;
  }

  @media (min-width: 800px) and (max-width: 900px) {
    .boardTitle {
      font-size: 0.9rem;
      width: 70%;
    }

    .boardCreateAt {
      font-size: 0.7rem;
    }

    .btnRow {
      height: auto;
      padding: 0;
      height: 30px;
    }

    .boardStructure {
      height: 40px;
      flex-grow: 1;
    }

    .boardRow {
      height: 70px;
    }
  }

  @media (max-width: 850px) {
    .boardTitle {
      font-size: 0.9rem;
    }

    .boardCreateAt {
      font-size: 0.7rem;
    }

    .boardTitle {
      width: 70%;
    }

    .boardContainer {
      display: flex;
      justify-content: center;
      width: 80%;
      cursor: pointer;
    }
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
  width: 100px;
  height: 30px;
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

  @media (min-width: 1000px) and (max-width: 1070px) {
    width: 90px;
    height: 26px;
    font-size: 0.7rem;
  }

  @media (max-width: 1000px) {
    width: 80px;
    height: 24px;
    font-size: 0.7rem;
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

  @media (max-width: 970px) {
    height: 20px;
    font-size: 0.5rem;
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
