// pages
import Signup from '@/pages/signup/index';

// libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

// apis
import { signup } from '../../pages/api/clients/signup';
import { user } from '@/mocks/api/userData';

// hooks
import { changeMessage, repeatInput } from '@/hooks/test';

jest.mock('../api/clients/signup');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

describe('Signup', () => {
  const queryClient = new QueryClient();

  let idInput: HTMLInputElement;
  let pwdInput: HTMLInputElement;
  let confirmPwdInput: HTMLInputElement;
  let signupBtn: HTMLButtonElement;

  beforeEach(() => {
    render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Signup />
        </QueryClientProvider>
      </RecoilRoot>
    );

    idInput = screen.getByPlaceholderText('아이디 입력') as HTMLInputElement;
    pwdInput = screen.getByPlaceholderText('비밀번호 입력') as HTMLInputElement;
    confirmPwdInput = screen.getByPlaceholderText(
      '비밀번호 확인'
    ) as HTMLInputElement;
    signupBtn = screen.getByText('회원가입') as HTMLButtonElement;
  });

  test('회원가입 테스트', async () => {
    (signup as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        status: 201,
        data: {
          message: '회원가입 성공!',
        },
      })
    );

    repeatInput([
      { element: idInput, value: '안녕클레오파트라' },
      { element: pwdInput, value: 'testingPwd' },
      { element: confirmPwdInput, value: 'testingPwd' },
    ]);

    fireEvent.click(signupBtn);

    const toastMessage = await changeMessage('회원가입 성공!');

    expect(toastMessage).toBeInTheDocument();
  });

  test('이미 존재하는 아이디 경우', async () => {
    (signup as jest.Mock).mockImplementation(() => {
      return Promise.reject({
        response: {
          data: {
            message: '이미 존재하는 아이디입니다!',
          },
        },
        status: 409,
      });
    });

    repeatInput([
      { element: idInput, value: 'testUser' },
      { element: pwdInput, value: 'test1' },
      { element: confirmPwdInput, value: 'test1' },
    ]);

    const checkUserData = user.filter((u) => {
      if (u.user_id === idInput.value && u.user_password === pwdInput.value)
        return u;
    });

    if (checkUserData.length > 0) {
      fireEvent.click(signupBtn);

      const toastMessage = await changeMessage('이미 존재하는 아이디입니다!');

      expect(toastMessage).toBeInTheDocument();
    }
  });

  test('아이디가 4자리 이하 일 때', async () => {
    (signup as jest.Mock).mockImplementation(() => {
      return Promise.reject({
        response: {
          data: {
            message: '아이디는 4자리 이상으로 설정해주세요!',
          },
        },
      });
    });

    repeatInput([
      { element: idInput, value: 'test' },
      { element: pwdInput, value: 'test' },
      { element: confirmPwdInput, value: 'test' },
    ]);

    if (idInput.value.length < 5) {
      fireEvent.click(signupBtn);

      const toastMessage = await changeMessage(
        '아이디는 4자리 이상으로 설정해주세요!'
      );

      expect(toastMessage).toBeInTheDocument();
    }
  });

  test('비밀번호와 비밀번호 확인이 일치하지 않을 때', async () => {
    (signup as jest.Mock).mockImplementation(() => {
      return Promise.reject({
        response: {
          data: {
            message: '비밀번호가 다릅니다!',
          },
        },
      });
    });

    repeatInput([
      { element: idInput, value: 'testings' },
      { element: pwdInput, value: 'testings' },
      { element: confirmPwdInput, value: 'testings222' },
    ]);

    if (pwdInput.value !== confirmPwdInput.value) {
      fireEvent.click(signupBtn);

      const toastMessage = await changeMessage('비밀번호가 다릅니다!');
      expect(toastMessage).toBeInTheDocument();
    }
  });
});
