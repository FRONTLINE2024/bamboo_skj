import { postUserData } from '@/pages/api/clients/login';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

interface usePostSignupKakoLoginType {
  kakaoData: AxiosResponse<any, any> | undefined;
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
        user_id: kakaoData?.data.id,
        user_nickname: kakaoData?.data.properties.nickname,
        profile_image: kakaoData?.data.properties.profile_image,
        accessToken,
      };
      const response = await postUserData(body);

      // console.log(response);

      return response.data;
    },
    onSuccess: (data: resultData) => {
      for (let key in data) {
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
