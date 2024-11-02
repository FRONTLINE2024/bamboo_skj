import { SetStateAction } from 'react';

export interface BoardType {
  id: number;
  board_title: string;
  board_content: string;
  board_user_id: string;
  board_img: File | string | null;
  createdAt: string;
}

export interface ToastStateType {
  state: boolean;
  stateText: string;
  stateCode: string;
}

export interface BoardDataType {
  board_title: string;
  board_content: string;
  board_img: File | null;
  board_user_id: number;
  createdAt: string;
}

export interface NavContextType {
  isBoardOpened: boolean;
  setIsBoardOpened: React.Dispatch<SetStateAction<boolean>>;
  openModalBoard: () => void;
  inputBoardData: (sort: string, value: string | number) => void;
  writeBoard: () => void;
  sortingBoards: (value: string) => void;
  handleBoardImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortValues: string[];
}

export interface pagingType {
  offset: number;
  limit: number;
}
