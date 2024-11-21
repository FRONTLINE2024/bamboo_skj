import { useState } from 'react';

// styles
import { Flex } from '@/styles/common/direction';
import { SignupContainer } from '@/styles/signup/styles';
import { SignupButton } from '@/styles/login/styles';

// types
import { signupType } from '@/types/signup';
import { ToastStateType } from '@/types/home';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

// components
import Toast from '@/components/common/Toast';
import useUserLogin from '@/hooks/signup/useUserLogin';

const Signup = () => {
  // toast boolean
  const [toastState, setToastState] = useState<ToastStateType>({
    state: false,
    stateText: '',
    stateCode: '',
  });

  const { state, stateCode, stateText } = toastState;

  // signup data
  const [signupData, setSignupData] = useState<signupType>({
    user_id: '',
    user_password: '',
    user_nickname: '',
    passwordConfirm: '',
  });

  const { user_id, user_password, user_nickname, passwordConfirm } = signupData;

  // password show
  const [isShowed, setIsShowed] = useState<boolean>(false);

  function handlePwd() {
    setIsShowed(!isShowed);
  }

  function handleLoginDate(sort: string, value: string) {
    setSignupData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  }

  // 로그인
  const { mutate: login } = useUserLogin({
    user_id,
    user_password,
    user_nickname,
    setToastState,
    handleToast,
  });

  // 로그인 에러 처리 함수
  function signups() {
    if (user_id.length < 5) {
      setToastState((prev) => ({
        ...prev,
        stateText: '아이디는 4자리 이상으로 설정해주세요!',
      }));
    } else if (user_password !== passwordConfirm) {
      setToastState((prev) => ({
        ...prev,
        stateText: '비밀번호가 다릅니다!',
      }));
    } else {
      login(); // 비밀번호가 일치하는 경우 회원가입을 시도합니다.
    }
    handleToast();
  }

  // Toast 메세지 handle
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

  return (
    <>
      <div id="toast_message"></div>

      {state && (
        <Toast stateCode={stateCode}>
          <div>{stateText}</div>
        </Toast>
      )}

      <SignupContainer>
        <div
          style={{
            ...Flex,
            flexDirection: 'column',
            height: '60%',
            justifyContent: 'space-between',
            transform: 'translateY(-10%)',
          }}
        >
          <h2>FrontLine</h2>

          <div
            style={{
              ...Flex,
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div className="inputContainer">
              <input
                type="text"
                placeholder="아이디 입력"
                value={user_id}
                onChange={(e) => handleLoginDate('user_id', e.target.value)}
              />
            </div>

            <div className="inputContainer">
              <input
                type="text"
                placeholder="닉네임 입력(4~8자)"
                value={user_nickname}
                onChange={(e) =>
                  handleLoginDate('user_nickname', e.target.value)
                }
              />
            </div>

            <div className="inputContainer">
              <input
                type={isShowed ? 'text' : 'password'}
                placeholder="비밀번호 입력"
                value={user_password}
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

            <div className="inputContainer">
              <input
                type={isShowed ? 'text' : 'password'}
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) =>
                  handleLoginDate('passwordConfirm', e.target.value)
                }
              />
            </div>
          </div>

          <SignupButton onClick={signups}>회원가입</SignupButton>
        </div>
      </SignupContainer>
    </>
  );
};

export default Signup;
