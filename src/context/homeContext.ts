import { createContext } from 'react';

// 상태 타입 정의
export interface NavContextType {
  inputBoardData: (sort: string, value: string | number) => void;
  writeBoard: () => void;
  handleBoardImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortingBoards: (value: string) => void;
  sortValues: string[];
}

// Context 생성 및 초기값 설정
export const navContext = createContext<NavContextType>({
  inputBoardData: () => {},
  writeBoard: () => {},
  handleBoardImg: () => {},
  sortingBoards: () => {},
  sortValues: [],
});
