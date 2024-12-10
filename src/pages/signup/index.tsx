import { useEffect, useState } from 'react';
import Image from 'next/image';

// styles
import { Flex } from '@/styles/common/direction';
import {
  SchoolInput,
  SignupContainer,
  InputContainer,
  Container,
} from '@/styles/signup/styles';
import { LoginButton, SignupButton } from '@/styles/login/styles';
import { SchoolContainer } from '@/styles/common/styles';

// types
import { signupType, universityType } from '@/types/signup';
import { ToastStateType } from '@/types/home';

// icons
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FaSchoolFlag } from 'react-icons/fa6';
import { GrSearch } from 'react-icons/gr';

// components
import Toast from '@/components/common/Toast';
import Modal from '@/components/common/Modal';

// hooks
import useUserLogin from '@/hooks/signup/useUserLogin';

// constants
import {
  universities,
  universityBlue,
  universityRed,
  universityGreen,
  universityGray,
} from '@/constants/universities';

const Signup = () => {
  // toast boolean
  const [toastState, setToastState] = useState<ToastStateType>({
    state: true,
    // stateText: '',
    // stateCode: '',
    stateCode: '404',
    stateText: '아이디는 4자리 이상으로 설정해주세요!',
  });

  const { state, stateCode, stateText } = toastState;

  // 학교 모달
  const [modalState, setModalState] = useState<boolean>(false);

  // signup data
  const [signupData, setSignupData] = useState<signupType>({
    user_id: '',
    user_password: '',
    user_nickname: '',
    passwordConfirm: '',
    university: '',
    logo: null,
  });

  const { user_id, user_password, user_nickname, passwordConfirm, university } =
    signupData;

  // border color
  const [borderColor, setBorderColor] = useState<string>('');

  // password show
  const [isShowed, setIsShowed] = useState<boolean>(false);

  function handlePwd() {
    setIsShowed(!isShowed);
  }

  function handleModal() {
    setModalState(!modalState);
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
    university,
    setToastState,
    handleToast,
  });

  // 로그인 에러 처리 함수
  function signups() {
    if (user_id.length < 5) {
      setToastState((prev) => ({
        ...prev,
        stateCode: '404',
        stateText: '아이디는 4자리 이상으로 설정해주세요!',
      }));
    } else if (user_nickname === '' || user_nickname.length < 5) {
      setToastState((prev) => ({
        ...prev,
        stateCode: '404',
        stateText: '닉네임을 제대로 입력해주세요!',
      }));
    } else if (user_password !== passwordConfirm) {
      setToastState((prev) => ({
        ...prev,
        stateCode: '404',
        stateText: '비밀번호가 다릅니다!',
      }));
    } else if (user_password === '' || passwordConfirm === '') {
      setToastState((prev) => ({
        ...prev,
        stateCode: '404',
        stateText: '비밀번호를 전부 입력해주세요!',
      }));
    } else {
      login();
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

  // 학교 가져오기
  function getUniversity(university: universityType) {
    const { img, name } = university;
    setSignupData((prev) => ({
      ...prev,
      university: name,
      logo: img,
    }));

    const colorMap = {
      '#0B4A8F': universityBlue,
      '#42AE37': universityGreen,
      '#D60F14': universityRed,
      '#8B7E75': universityGray,
    };

    let borderColor = '#FF6500';

    for (const [color, universities] of Object.entries(colorMap)) {
      if (universities.includes(name)) {
        borderColor = color;
        break;
      }
    }
    setBorderColor(borderColor);

    handleModal();
  }

  useEffect(() => {
    console.log('signupData: ', signupData);
    console.log('borderColor: ', borderColor);
  }, [signupData, borderColor]);

  return (
    <Container $borderColor={borderColor}>
      <div id="toast_message"></div>
      <div id="modal-container"></div>
      {modalState && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2,
          }}
          onClick={handleModal}
        />
      )}

      {state && (
        <Toast stateCode={stateCode}>
          <div
            style={{
              textAlign: 'center',
              marginLeft: '0.2rem',
              marginRight: '1rem',
            }}
          >
            {stateText}
          </div>
        </Toast>
      )}

      <SignupContainer>
        <div className="container">
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

            <InputContainer $borderColor={borderColor} onClick={handleModal}>
              {signupData.logo ? (
                <Image
                  src={signupData.logo?.src}
                  alt="대학로고"
                  width={25}
                  height={25}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <FaSchoolFlag />
              )}

              <input
                style={{
                  cursor: 'pointer',
                  paddingLeft: '3px',
                }}
                defaultValue={university}
              />
            </InputContainer>
            {modalState && (
              <Modal
                width={40}
                height={60}
                modal={modalState}
                openModal={handleModal}
              >
                <SchoolContainer>
                  <header
                    style={{
                      ...Flex,
                      justifyContent: 'space-around',
                    }}
                  >
                    <SchoolInput />
                    <GrSearch size={20} />
                  </header>
                  <main>
                    {universities.map((university, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            ...Flex,
                            justifyContent: 'space-between',
                            padding: '3px 10px',
                            fontFamily: 'GmarketSansMedium',
                          }}
                          onClick={() => getUniversity(university)}
                        >
                          <div
                            style={{
                              ...Flex,
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Image
                              src={university.img}
                              alt="학교 이미지"
                              width={30}
                              height={30}
                              style={{
                                marginRight: '10px',
                                objectFit: 'contain',
                              }}
                            />{' '}
                            {university.name}
                          </div>

                          <div></div>
                        </div>
                      );
                    })}
                  </main>
                </SchoolContainer>
              </Modal>
            )}
          </div>

          <SignupButton onClick={signups}>회원가입</SignupButton>
          <LoginButton>취소</LoginButton>
        </div>
      </SignupContainer>
    </Container>
  );
};

export default Signup;
