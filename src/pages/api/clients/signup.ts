import basicClient from './basicClient';

export const signup = (body: { user_id: string; user_password: string }) => {
  return basicClient.post('/user', body);
};
