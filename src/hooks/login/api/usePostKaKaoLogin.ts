import { SetStateAction } from 'react';

// apis
import { getToken } from '@/pages/api/clients/login';

// types
import { accessTokenType } from '@/types/login';
import { KakaoData } from './usePostSignupKakaoLogin';

// libraries
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';

interface usePostKakaoLoginType {
  setAccessToken: React.Dispatch<SetStateAction<string>>;
  refetchKakaoData: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<KakaoData, Error>>;
}

const usePostKakaoLogin = ({
  setAccessToken,
  refetchKakaoData,
}: usePostKakaoLoginType) => {
  return useMutation({
    mutationKey: ['kakaoLogin'],
    mutationFn: async () => {
      const code = new URL(window.location.href).searchParams.get('code');

      const clientId = process.env.NEXT_PUBLIC_REST_API_KEY;
      const redirectUri = process.env.NEXT_PUBLIC_REDIREACT_URI;

      if (!clientId || !redirectUri || !code) {
        console.error('Missing required parameters for token request');
        return;
      }

      const body = {
        grant_type: 'authorization_code',
        client_id: clientId as string,
        redirect_uri: redirectUri as string,
        code: code as string,
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
