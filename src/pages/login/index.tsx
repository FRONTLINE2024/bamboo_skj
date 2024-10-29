import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// styles
import { Flex } from '@/styles/common/direction';
import { Container, KakaoButton, LoginButton, SignupButton } from './styles';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';

// types
import { userType } from '@/types/login';
import { useMutation } from '@tanstack/react-query';

// apis
import { login } from '../api/clients/login';
import Link from 'next/link';

// components
import Toast from '@/components/common/Toast';

// libraries
import Cookie from 'js-cookie';
import { ToastStateType } from '@/types/home';
import usePostUserLogin from '@/hooks/login/api/usePostUserLogin';
import useGetFindUser from '@/hooks/login/api/useGetFindUser';

const Login = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  // toast boolean
  const [toastState, setToastState] = useState<ToastStateType>({
    state: false,
    stateText: '',
    stateCode: '',
  });
  const { state, stateText, stateCode } = toastState;
  // router
  const router = useRouter();
  // password show
  const [isShowed, setIsShowed] = useState<boolean>(false);
  // login data
  const [loginData, setLoginData] = useState<userType>({
    user_id: '',
    user_password: '',
  });

  const userIndex = isClient && localStorage.getItem('user_index');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { user_id, user_password } = loginData;

  function handlePwd() {
    setIsShowed(!isShowed);
  }

  function handleToast() {
    setToastState((prev) => ({
      ...prev,
      state: true,
    }));
    setTimeout(() => {
      setToastState((prev) => ({
        ...prev,
        state: false,
      }));
    }, 2500);
  }

  function handleLoginDate(sort: string, value: string) {
    setLoginData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  }

  // 로그인 함수
  function doLogin() {
    if (user_id.length > 0 && user_password.length > 0) {
      userLogins();
    }
  }

  // React Query
  const { mutate: userLogins } = usePostUserLogin({
    loginData,
    setToastState,
    handleToast,
  }); // 로그인

  const { refetch: findUser, data: existUser } = useGetFindUser({ userIndex }); // 유저 데이터 가져오기

  // 카카오 로그인
  function kakaoLogin() {
    findUser();

    if (existUser) {
      Cookie.set(`accessToken`, existUser.data.accessToken);
      Cookie.set(`user_nickname`, existUser.data.user_nickname);
      Cookie.set(`profile_image`, existUser.data.profile_image);
      router.push('/');
    } else {
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIREACT_URI}&response_type=code`;
      window.location.href = kakaoURL;
    }
  }

  return (
    <>
      <div id="toast_message"></div>
      {state && (
        <Toast stateCode={stateCode}>
          <div>{stateText}</div>
        </Toast>
      )}

      <Container>
        <div
          style={{
            ...Flex,
            flexDirection: 'column',
            height: '50%',
            justifyContent: 'space-between',
            transform: 'translateY(-10%)',
          }}
        >
          <h2>FrontLine</h2>

          <div style={{ ...Flex, flexDirection: 'column', gap: '10px' }}>
            <div className="inputContainer">
              <input
                type="text"
                placeholder="ID"
                onChange={(e) => handleLoginDate('user_id', e.target.value)}
              />
            </div>

            <div className="inputContainer">
              <input
                type={isShowed ? 'text' : 'password'}
                placeholder="Password"
                onChange={(e) =>
                  handleLoginDate('user_password', e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    doLogin();
                  }
                }}
              />

              {isShowed ? (
                <FaEyeSlash
                  style={{ marginRight: '0.2rem' }}
                  onClick={handlePwd}
                />
              ) : (
                <FaEye style={{ marginRight: '0.2rem' }} onClick={handlePwd} />
              )}
            </div>
          </div>

          <div
            style={{
              ...Flex,
              flexDirection: 'column',
              marginTop: '1rem',
              gap: '8px',
            }}
          >
            <LoginButton onClick={() => userLogins()}>로그인</LoginButton>
            <Link data-testid="signup-link" href={'/signup'}>
              <SignupButton>회원가입</SignupButton>
            </Link>
          </div>
        </div>
        <KakaoButton onClick={kakaoLogin}>
          <div className="btn">
            <RiKakaoTalkFill size={36} fill="#000000" />
          </div>

          <span className="loginText">카카오 로그인</span>
          <span></span>
          <span></span>
        </KakaoButton>
      </Container>
    </>
  );
};

export default Login;
