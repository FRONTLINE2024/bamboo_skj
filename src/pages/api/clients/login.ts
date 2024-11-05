import basicClient from './basicClient';

export const login = (body: { user_id: string; user_password: string }) => {
  return basicClient.post('/login', body);
};

export const getToken = (
  body: {
    grant_type: string;
    client_id: string;
    redirect_uri: string;
    code: string;
  },
  headers: { headers: { 'Content-Type': string } }
) => {
  return basicClient.post('https://kauth.kakao.com/oauth/token', body, headers);
};

export const getKaKaoUserData = (headers: { Authorization: string }) => {
  return basicClient.get('https://kapi.kakao.com/v2/user/me', { headers });
};

export const postUserData = (body: {
  user_id: number;
  user_nickname: string;
  profile_image: string;
  accessToken: string;
}) => {
  return basicClient.post('/kakao', body);
};

export const findUser = (user_index: number) => {
  return basicClient.get(`/user/${user_index}`);
};
