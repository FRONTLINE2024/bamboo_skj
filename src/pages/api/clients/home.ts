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

export const postBoardData = (body: {}) => {
  return basicClient.post('/board/upload', body);
};

export const deleteBoardData = (body: {}) => {
  return basicClient.delete('/board', body);
};

export const patchBoardData = (body: {}) => {
  return basicClient.patch('/board/patch', body);
};

export const getSpecificBoard = (id: number) => {
  return basicClient.get(`/board/${id}`);
};

export const getAllChattingData = () => {
  return basicClient.get('/chat');
};
