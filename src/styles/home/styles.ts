import styled from 'styled-components';
import { theme } from '../common/color';

export const FriendRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 15px 3px 15px;

  .btn {
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
`;

export const FriendHeader = styled.header`
  display: flex;
  justify-content: space-evenly;

  span {
    cursor: pointer; /* 클릭 가능한 느낌 */
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    font-family: 'GmarketSansLight';

    /* 색상 및 경계 색상 변경 */
    &.active {
      color: ${theme.primary}; /* 활성화된 색상 */
      border-bottom: 1px solid ${theme.primary}; /* 활성화된 경계 색상 */
    }
  }
`;
