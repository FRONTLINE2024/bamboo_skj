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

export interface ChatDataType {
  chat_content: string;
  user_id: string;
  chat_id: number;
  chat_user_id: number;
  createAt: string;
  receiverID: number;
  senderID: number;
  chat_user_nickname: string;
  university: string;
}

export interface messageType {
  currentMessage: string;
  receiverID: number;
}
