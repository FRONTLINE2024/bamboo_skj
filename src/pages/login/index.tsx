import { useEffect, useState } from 'react';

// styles
import { Flex } from '@/styles/common/direction';
import { Container, LoginButton, SignupButton } from './styles';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

// types
import { userType } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

// apis
import { login } from '../api/clients/login';
import Link from 'next/link';

const Login = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<userType>({
    user_id: '',
    user_password: '',
  });

  const { user_id, user_password } = loginData;

  function handlePwd() {
    setIsShowed(!isShowed);
  }

  function handleLoginDate(sort: string, value: string) {
    setLoginData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  }

  function doLogin() {
    if (user_id.length > 0 && user_password.length > 0) {
      userLogin.mutate();
    }
  }

  const userLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const response = await login(loginData);

      console.log(response);

      return response.data;
    },

    onError(err) {
      console.log(err.message);
    },
  });

  useEffect(() => {
    console.log('loginData: ', loginData);
  }, [loginData]);
  return (
    <>
      <div id="toast_message"></div>
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
              marginTop: '2rem',
              gap: '8px',
            }}
          >
            <LoginButton onClick={() => userLogin.mutate()}>로그인</LoginButton>
            <Link href={'/signup'}>
              <SignupButton>회원가입</SignupButton>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
