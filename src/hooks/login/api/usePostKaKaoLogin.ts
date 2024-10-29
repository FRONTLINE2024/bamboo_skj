import { getToken } from '@/pages/api/clients/login';
import { accessTokenType } from '@/types/login';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface usePostKakaoLoginType {
  setAccessToken: React.Dispatch<SetStateAction<string>>;
  refetchKakaoData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

const usePostKakaoLogin = ({
  setAccessToken,
  refetchKakaoData,
}: usePostKakaoLoginType) => {
  return useMutation({
    mutationKey: ['kakaoLogin'],
    mutationFn: async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      const body = {
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
        redirect_uri: process.env.NEXT_PUBLIC_REDIREACT_URI,
        code,
      };

      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const response = await getToken(body, headers);

      console.log('get Access Token:', response);

      return response.data;
    },
    onSuccess: (data: accessTokenType) => {
      setAccessToken(data.access_token);

      setTimeout(() => {
        refetchKakaoData();
      }, 300);
    },
  });
};

export default usePostKakaoLogin;
