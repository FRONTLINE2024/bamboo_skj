import basicClient from './basicClient';

export const signup = (body: {}) => {
  return basicClient.post('/user', body);
};
