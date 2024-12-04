import { StaticImageData } from 'next/image';

export interface signupType {
  user_id: string;
  user_password: string;
  user_nickname: string;
  passwordConfirm: string;
  university: string;
  logo: StaticImageData | null;
}

export interface kakaoSignupType {
  user_id: number;
  user_nickname: string;
  profile_image: string;
}

export interface universityType {
  name: string;
  img: StaticImageData;
}
