import basicClient from './basicClient';

export const login = (body: {}) => {
  return basicClient.post('/login', body);
};

export const getToken = (body: {}, headers: {}) => {
  return basicClient.post('https://kauth.kakao.com/oauth/token', body, headers);
};

export const getKaKaoUserData = (headers: {}) => {
  return basicClient.get('https://kapi.kakao.com/v2/user/me', { headers });
};

export const postUserData = (body: {}) => {
  return basicClient.post('/kakao', body);
};

export const findUser = (user_index: number) => {
  return basicClient.get(`/user/${user_index}`);
};
