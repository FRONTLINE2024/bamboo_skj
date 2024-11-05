import { getToken } from '@/pages/api/clients/login';
import { accessTokenType } from '@/types/login';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { SetStateAction } from 'react';
import { KakaoData } from './usePostSignupKakaoLogin';

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

      // 환경 변수값 추출 및 검증
      const clientId = process.env.NEXT_PUBLIC_REST_API_KEY;
      const redirectUri = process.env.NEXT_PUBLIC_REDIREACT_URI;

      if (!clientId || !redirectUri || !code) {
        // 필수 필드 중 하나가 비어있으면 예외 처리
        console.error('Missing required parameters for token request');
        return;
      }

      const body = {
        grant_type: 'authorization_code',
        client_id: clientId as string, // 타입 명시(이미 체크했기 때문에 안전)
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
