import Image from 'next/image';
import { useEffect, useState } from 'react';
// img
import Logo from '@/assets/images/FrontLine_Logo.png';

// styles
import { Letter, LoadingContainer, LogoContainer } from './styles';

// apis
import usePostKakaoLogin from '@/hooks/login/api/usePostKaKaoLogin';
import useGetUserKakoDataType from '@/hooks/login/api/useGetUserKakoData';

// types
import { kakaoUserType } from '@/types/login';
import usePostSignupKakoLogin from '@/hooks/login/api/usePostSignupKakaoLogin';

const Loading = () => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userData, setUserData] = useState<kakaoUserType>({
    user_id: 0,
    user_nickname: '',
    profile_image: '',
  });
  const text = 'Front Line▹';

  const {
    refetch: refetchKakaoData,
    data: kakaoData,
    isSuccess,
  } = useGetUserKakoDataType({ accessToken });
  const { mutate: kakaoLogin } = usePostKakaoLogin({
    setAccessToken,
    refetchKakaoData,
  });
  const { mutate: signup } = usePostSignupKakoLogin({ kakaoData, accessToken });

  useEffect(() => {
    kakaoLogin();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      signup();
    }
  }, [isSuccess]);

  return (
    <LoadingContainer>
      <LogoContainer>
        {text.split('').map((char, index) => (
          <Letter key={index} $index={index}>
            {char}
          </Letter>
        ))}
      </LogoContainer>
      <Image src={Logo} alt="로고" width={300} height={300} />
    </LoadingContainer>
  );
};

export default Loading;
