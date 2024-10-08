export interface BoardType {
  id: number;
  board_title: string;
  board_content: string;
  board_user_id: string;
  board_img: File | string;
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
