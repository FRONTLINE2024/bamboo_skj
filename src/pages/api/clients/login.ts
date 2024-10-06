import basicClient from './basicClient';

export const login = (body: {}) => {
  return basicClient.post('/login', body);
};
