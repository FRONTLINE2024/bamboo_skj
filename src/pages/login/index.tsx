import { useEffect, useState } from 'react';

// styles
import { Flex } from '@/styles/common/direction';
import { Container, LoginButton, SignupButton } from './styles';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

// types
import { userType } from '@/types/user';

const Login = () => {
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<userType>({
    user_id: '',
    user_password: '',
  });

  function handlePwd() {
    setIsShowed(!isShowed);
  }

  function handleLoginDate(sort: string, value: string) {
    setLoginData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  }

  useEffect(() => {
    console.log('loginData: ', loginData);
  }, [loginData]);
  return (
    <>
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
            <LoginButton>로그인</LoginButton>
            <SignupButton>회원가입</SignupButton>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
