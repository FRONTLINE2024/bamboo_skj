export interface userType {
  user_id: string;
  user_password: string;
}

export interface kakaoUserType {
  user_id: number;
  user_nickname: string;
  profile_image: string;
}

export interface accessTokenType {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}
