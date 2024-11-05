import { postUserData } from '@/pages/api/clients/login';
import { useMutation } from '@tanstack/react-query';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

// Kakao data 타입 정의
export interface KakaoData {
  data: {
    id: string;
    properties: {
      nickname: string;
      profile_image: string;
    };
  };
}

interface usePostSignupKakoLoginType {
  kakaoData: KakaoData;
  accessToken: string;
}

interface resultData {
  [key: string]: string;
}

const usePostSignupKakoLogin = ({
  kakaoData,
  accessToken,
}: usePostSignupKakoLoginType) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['postSignupKakao'],
    mutationFn: async () => {
      const body = {
        user_id: Number(kakaoData?.data.id),
        user_nickname: kakaoData?.data.properties.nickname,
        profile_image: kakaoData?.data.properties.profile_image,
        accessToken,
      };
      const response = await postUserData(body);

      // console.log(response);

      return response.data;
    },
    onSuccess: (data: resultData) => {
      for (const key in data) {
        Cookie.set(`${key}`, data[key]);
      }
      localStorage.setItem('user_index', data.user_index);
      router.push('/');
    },

    onError: (err) => {
      alert(err);
    },
  });
};

export default usePostSignupKakoLogin;
