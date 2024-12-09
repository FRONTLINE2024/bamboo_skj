import styled from 'styled-components';
import { theme } from '../common/color';

export const FriendRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 15px 3px 15px;

  .container {
    display: flex;
    height: 70px;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #d2d2d1;
    padding: 7px;
  }
  .userSection {
    width: 92%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .userEmail {
    font-family: 'GmarketSansMedium';
  }
  .createAt {
    font-family: 'GmarketSansLight';
  }
  .btn {
    width: 40px;
    text-align: center;
    font-family: 'GmarketSansLight';
    cursor: pointer;
    background-color: ${theme.third};
    border: 1px solid white;
    border-radius: 0.2rem;
    padding: 3px 6px 3px 6px;
    color: white;

    &:hover {
      background-color: white;
      color: ${theme.third};
      border: 1px solid ${theme.third};
    }
  }

  @media (min-width: 1000px) and (max-width: 1070px) {
    font-size: 0.9rem;
  }

  @media (min-width: 880px) and (max-width: 1000px) {
    font-size: 0.8rem;
  }

  @media (max-width: 880px) {
    font-size: 0.7rem;

    .container {
      height: 50px;
    }
    .userSection {
      height: 40px;
    }
  }
`;

export const FriendHeader = styled.header`
  display: flex;
  justify-content: space-evenly;

  span {
    cursor: pointer;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    font-family: 'GmarketSansLight';

    &.active {
      color: ${theme.primary};
      border-bottom: 1px solid ${theme.primary};
    }
  }

  @media (min-width: 1000px) and (max-width: 1070px) {
    font-size: 0.9rem;
  }

  @media (min-width: 900px) and (max-width: 1000px) {
    font-size: 0.8rem;
  }

  @media (min-width: 750px) and (max-width: 900px) {
    font-size: 0.7rem;
  }

  @media (min-width: 660px) and (max-width: 750px) {
    font-size: 0.65rem;
  }

  @media (max-width: 660px) {
    font-size: 0.5rem;
  }
`;
