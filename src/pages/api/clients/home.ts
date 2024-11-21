import { pagingType } from '@/types/home';
import basicClient from './basicClient';

export const AllData = () => {
  return basicClient.get('/board');
};

export const AscendData = () => {
  return basicClient.get('/board/sort/date_ascend');
};

export const DescendData = () => {
  return basicClient.get('/board/sort/date_descend');
};

export const ContentAscendData = () => {
  return basicClient.get('/board/sort/content_ascend');
};

export const postBoardData = (body: FormData) => {
  return basicClient.post('/board/upload', body);
};

export const deleteBoardData = (body: {
  data: { id: number; board_user_id: string };
}) => {
  return basicClient.delete('/board', body);
};

export const patchBoardData = (body: FormData) => {
  return basicClient.patch('/board/patch', body);
};

export const getSpecificBoard = (id: number) => {
  return basicClient.get(`/board/${id}`);
};

export const getAllChattingData = () => {
  return basicClient.get('/chat');
};

export const postChatMessage = (body: {
  chat_content: string;
  chat_user_id: number;
}) => {
  return basicClient.post('/chat', body);
};

export const getInfiniteData = ({ offset, limit }: pagingType) => {
  return basicClient.get(`/paging?limit=${limit}&offset=${offset}`);
};

// 친구 요청
export const addFriends = (body: {
  userID: number;
  friendUserID: number;
  status: boolean;
}) => {
  return basicClient.post('/friend', body);
};

// 내 채팅 가져오기
export const getMyChat = (chat_user_id: number) => {
  return basicClient.get(`/chat/chatting`, {
    params: { chat_user_id },
  });
};

// 내가 받은 친구 요청 가져오기
export const getMyFriendRequest = (userID: number) => {
  return basicClient.get(`/friend`, {
    params: { userID },
  });
};

// 친구 수락
export const acceptFriend = (body: {
  userID: number;
  friendUserID: number;
  status: boolean;
}) => {
  return basicClient.post('/friend/accept', body);
};

export const getAllUser = () => {
  return basicClient.get('/user');
};

export const deleteFriendss = (body: {
  data: { userID: number; friendUserID: number; status: boolean };
}) => {
  return basicClient.delete('/friend', body);
};
