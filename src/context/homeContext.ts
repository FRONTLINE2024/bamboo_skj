import { SetStateAction, createContext } from 'react';

// types
import { messageType } from '@/types/chat';
import { BoardType } from '@/types/home';

// 상태 타입 정의
export interface NavContextType {
  inputBoardData: (sort: string, value: string | number) => void;
  writeBoard: () => void;
  handleBoardImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortingBoards: (value: string) => void;
  sortValues: string[];
}

export interface ChatContextType {
  currentMessage: string;
  setCurrentMessage: React.Dispatch<SetStateAction<messageType>>;
  width: number;
}

export interface BoardContextType {
  inputSelectedBoardData: (sort: string, value: string | number) => void;
  selected: BoardType;
  boardModify: boolean;
  handleImageClick: () => void;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  PatchBoardData(): void;
  modifyChange(): void;
  width: number;
}

// Context 생성 및 초기값 설정
export const navContext = createContext<NavContextType>({
  inputBoardData: () => {},
  writeBoard: () => {},
  handleBoardImg: () => {},
  sortingBoards: () => {},
  sortValues: [],
});

export const chatContext = createContext<ChatContextType>({
  currentMessage: '',
  setCurrentMessage: () => {},
  width: 0,
});

export const boardContext = createContext<BoardContextType>({
  inputSelectedBoardData: () => {},
  selected: {
    id: 0,
    board_title: '',
    board_content: '',
    board_user_id: '',
    board_img: '',
    createdAt: '',
    university: '',
    user_nickname: '',
  },
  boardModify: false,
  handleImageClick: () => {},
  fileInputRef: { current: null },
  PatchBoardData: () => {},
  modifyChange: () => {},
  width: 0,
});
