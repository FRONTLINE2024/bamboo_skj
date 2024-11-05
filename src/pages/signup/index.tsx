import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// styles
import { Flex } from '@/styles/common/direction';
import { SignupContainer } from '@/styles/signup/styles';
import { SignupButton } from '@/styles/login/styles';

// types
import { signupType } from '@/types/signup';
import { ToastStateType } from '@/types/home';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';

// apis
import { signup } from '@/pages/api/clients/signup';

// components
import Toast from '@/components/common/Toast';

interface AxiosError {
  response: {
    data: {
      stateCode: string;
      stateText: string;
    };
  };
  status: number;
}

const Signup = () => {
  const router = useRouter();
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
    passwordConfirm: '',
  });

  const { user_id, user_password, passwordConfirm } = signupData;

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

  const doSignup = useMutation({
    mutationKey: ['signup'],
    mutationFn: async () => {
      const body = {
        user_id,
        user_password,
      };
      const response = await signup(body);

      console.log(response);

      if (response.status === 201) {
        setToastState((prev) => ({
          ...prev,
          stateCode: `${response.status}`,
          stateText: '회원가입 성공!',
        }));

        handleToast();
        setTimeout(() => {
          router.push('/login');
        }, 2510);
      }
    },
    onError(err: AxiosError) {
      console.log(err);
      if (err.status === 409) {
        setToastState((prev) => ({
          ...prev,
          stateCode: '409',
          stateText: '이미 존재하는 아이디입니다!',
        }));

        handleToast();
      }
    },
  });

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
      doSignup.mutate(); // 비밀번호가 일치하는 경우 회원가입을 시도합니다.
    }
    handleToast();
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

  useEffect(() => {
    console.log('toastState: ', toastState);
    console.log('singupData:', signupData);
  }, [toastState, signupData]);

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
            height: '50%',
            justifyContent: 'space-between',
            transform: 'translateY(-10%)',
          }}
        >
          <h2>FrontLine</h2>

          <div style={{ ...Flex, flexDirection: 'column', gap: '20px' }}>
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
