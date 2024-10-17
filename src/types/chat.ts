export interface IMessage {
  user: string;
  chat_user_id: string;
  chat_content: string;
}

export interface ChattingDataType {
  chat_content: string;
  chat_id: number;
  chat_user_id: number;
  chat_user_nickname: string;
}
