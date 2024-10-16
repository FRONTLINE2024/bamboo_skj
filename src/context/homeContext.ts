import { createContext } from 'react';

// 상태 타입 정의
export interface NavContextType {
  isBoardOpened: boolean;
  setIsBoardOpened: React.Dispatch<React.SetStateAction<boolean>>;
  openModalBoard: () => void;
  inputBoardData: (sort: string, value: string | number) => void;
  writeBoard: () => void;
  sortingBoards: (value: string) => void;
  handleBoardImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortValues: string[];
  // sendMessage: () => Promise<void>;
}

// Context 생성 및 초기값 설정
export const navContext = createContext<NavContextType>({
  isBoardOpened: false,
  setIsBoardOpened: () => {},
  openModalBoard: () => {},
  inputBoardData: (sort, value) => {},
  writeBoard: () => {},
  sortingBoards: (value) => {},
  handleBoardImg: () => {},
  sortValues: [],
  // sendMessage: () => {},
});
